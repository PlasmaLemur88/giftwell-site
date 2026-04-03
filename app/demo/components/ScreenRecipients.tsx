'use client';

import { useState, useEffect, useRef } from 'react';
import { StoreData } from '../lib/types';

const MESSY_DATA = `Sarah Johnson, sarah.j@acmecorp.com, 123 Main St Apt 4B, San Francisco CA 94102
mike.chen@techstartup.io
Lisa Park - lisa@designstudio.co - (415) 555-0199
john doe   john.d@enterprise.com   456 Oak Avenue, Suite 200, New York, NY 10001
JANE SMITH <jane.smith@bigcorp.com> 789 Pine Road, Chicago IL
alex@remoteteam.dev
tom.wilson@agency.com, 321 Elm Street, Austin TX 78701
maria.garcia@consulting.com (512) 555-0234
David Kim, david.k@startupco.com
rachel@nonprofit.org 555 Cedar Lane Apt 12, Portland OR 97201
Chris Taylor chris.t@marketing.com 987 Birch Drive Denver CO
sam.patel@fintech.io, (303) 555-0456`;

const PARSED_ROWS = [
  { name: 'Sarah Johnson', email: 'sarah.j@acmecorp.com', address: '123 Main St Apt 4B, San Francisco, CA 94102' },
  { name: 'Mike Chen', email: 'mike.chen@techstartup.io', address: '—' },
  { name: 'Lisa Park', email: 'lisa@designstudio.co', address: '—' },
  { name: 'John Doe', email: 'john.d@enterprise.com', address: '456 Oak Avenue, Suite 200, New York, NY 10001' },
  { name: 'Jane Smith', email: 'jane.smith@bigcorp.com', address: '789 Pine Road, Chicago, IL' },
  { name: 'Alex', email: 'alex@remoteteam.dev', address: '—' },
  { name: 'Tom Wilson', email: 'tom.wilson@agency.com', address: '321 Elm Street, Austin, TX 78701' },
  { name: 'Maria Garcia', email: 'maria.garcia@consulting.com', address: '—' },
  { name: 'David Kim', email: 'david.k@startupco.com', address: '—' },
  { name: 'Rachel', email: 'rachel@nonprofit.org', address: '555 Cedar Lane Apt 12, Portland, OR 97201' },
  { name: 'Chris Taylor', email: 'chris.t@marketing.com', address: '987 Birch Drive, Denver, CO' },
  { name: 'Sam Patel', email: 'sam.patel@fintech.io', address: '—' },
];

export default function ScreenRecipients({
  store,
  onNext,
}: {
  store: StoreData;
  onNext: () => void;
}) {
  const [phase, setPhase] = useState<'paste' | 'typing' | 'parsing' | 'done'>('paste');
  const [displayedText, setDisplayedText] = useState('');
  const [visibleRows, setVisibleRows] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  void store;

  const handleParse = () => {
    if (phase !== 'paste') return;
    setPhase('typing');
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex += 3;
      if (charIndex >= MESSY_DATA.length) {
        charIndex = MESSY_DATA.length;
        clearInterval(typeInterval);
        setTimeout(() => {
          setPhase('parsing');
          let row = 0;
          const rowInterval = setInterval(() => {
            row++;
            setVisibleRows(row);
            if (row >= PARSED_ROWS.length) {
              clearInterval(rowInterval);
              setTimeout(() => setPhase('done'), 300);
            }
          }, 80);
        }, 500);
      }
      setDisplayedText(MESSY_DATA.slice(0, charIndex));
    }, 15);
  };

  useEffect(() => {
    if (textareaRef.current && phase === 'typing') {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedText, phase]);

  return (
    <div className="demo-site-container">
      <div className="screen-recipients-dark">
        <div className="recipients-dark-header">
          <h2>Add Recipients</h2>
          {phase === 'done' && (
            <span className="recipients-count-dark">{PARSED_ROWS.length} recipients added in 2.3 seconds</span>
          )}
        </div>

        <div className="recipients-input-dark">
          <h4>Paste anything — we&apos;ll figure it out</h4>
          <p>Names, emails, addresses, phone numbers... any format, any order.</p>
          <textarea
            ref={textareaRef}
            className="recipients-textarea-dark"
            value={phase === 'paste' ? '' : displayedText}
            placeholder={'Paste a messy list of names, emails, addresses...\n\nOr click "Demo it" to see the magic'}
            readOnly={phase !== 'paste'}
          />
          {phase === 'paste' && (
            <button className="recipients-demo-btn" onClick={handleParse}>Demo it</button>
          )}
          {phase === 'typing' && (
            <div className="recipients-status-dark">
              <span className="typing-indicator" /> Pasting recipient data...
            </div>
          )}
          {phase === 'parsing' && (
            <div className="recipients-status-dark" style={{ color: 'var(--gw-vibrant-lime)' }}>
              <span className="parse-spinner" /> AI is parsing...
            </div>
          )}
        </div>

        {(phase === 'parsing' || phase === 'done') && (
          <div className="recipients-table-dark">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 40 }}></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {PARSED_ROWS.slice(0, visibleRows).map((row, i) => (
                  <tr key={i} className="recipient-row-enter">
                    <td><div className="recipient-check-dark">✓</div></td>
                    <td>{row.name}</td>
                    <td className="email-col">{row.email}</td>
                    <td className="addr-col">{row.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {phase === 'done' && (
          <button className="recipients-continue-dark" onClick={onNext}>
            Continue to Dashboard →
          </button>
        )}
      </div>
    </div>
  );
}
