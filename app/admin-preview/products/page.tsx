'use client';

import { useState } from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  InlineGrid,
  Text,
  Button,
  Box,
  Badge,
  TextField,
  Divider,
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { Toggle } from '../components/Toggle';

type Product = {
  id: string;
  name: string;
  price: string;
  inStock: boolean;
  bg: string;
};

const ALL_PRODUCTS: Product[] = [
  { id: '1',  name: 'Signature Candle',   price: '$34.00', inStock: true,  bg: 'linear-gradient(135deg, #F4ECD8, #E8D8B8)' },
  { id: '2',  name: 'Bath Salts',         price: '$28.00', inStock: true,  bg: 'linear-gradient(135deg, #DCDCFF, #B8B8E8)' },
  { id: '3',  name: 'Artisan Tea Set',    price: '$32.00', inStock: true,  bg: 'linear-gradient(135deg, #A8E5C5, #6FCBA0)' },
  { id: '4',  name: 'Cashmere Gloves',    price: '$65.00', inStock: false, bg: 'linear-gradient(135deg, #2a2a2a, #4a4a4a)' },
  { id: '5',  name: 'Leather Journal',    price: '$45.00', inStock: true,  bg: 'linear-gradient(135deg, #8B4513, #654321)' },
  { id: '6',  name: 'Ceramic Mug',        price: '$24.00', inStock: true,  bg: 'linear-gradient(135deg, #FFC9D5, #F58CA8)' },
  { id: '7',  name: 'Chocolate Box',      price: '$38.00', inStock: true,  bg: 'linear-gradient(135deg, #5D4037, #3E2723)' },
  { id: '8',  name: 'Wool Scarf',         price: '$55.00', inStock: false, bg: 'linear-gradient(135deg, #B0BEC5, #78909C)' },
  { id: '9',  name: 'Hand Cream',         price: '$22.00', inStock: true,  bg: 'linear-gradient(135deg, #FFE9A0, #FFD060)' },
  { id: '10', name: 'Wine Tumbler',       price: '$48.00', inStock: true,  bg: 'linear-gradient(135deg, #1F3A5F, #0F1A2E)' },
  { id: '11', name: 'Cookie Tin',         price: '$36.00', inStock: true,  bg: 'linear-gradient(135deg, #E8B4B8, #D08A8E)' },
  { id: '12', name: 'Espresso Beans',     price: '$30.00', inStock: true,  bg: 'linear-gradient(135deg, #3E2723, #1B0A06)' },
  { id: '13', name: 'Linen Throw',        price: '$72.00', inStock: true,  bg: 'linear-gradient(135deg, #F5F5DC, #DDD8AD)' },
  { id: '14', name: 'Stoneware Bowl Set', price: '$58.00', inStock: true,  bg: 'linear-gradient(135deg, #C9B79C, #8B7355)' },
  { id: '15', name: 'Olive Oil',          price: '$26.00', inStock: false, bg: 'linear-gradient(135deg, #6B8E23, #556B2F)' },
  { id: '16', name: 'Honey Jar',          price: '$18.00', inStock: true,  bg: 'linear-gradient(135deg, #FFD700, #DAA520)' },
];

type Filter = 'all' | 'in-stock' | 'out-of-stock';

export default function ProductsPage() {
  const [autoInclude, setAutoInclude] = useState(true);
  const [giftable, setGiftable] = useState<Set<string>>(
    new Set(ALL_PRODUCTS.filter((p) => p.inStock).map((p) => p.id)),
  );
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (filter === 'in-stock' && !p.inStock) return false;
    if (filter === 'out-of-stock' && p.inStock) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleProduct = (id: string) => {
    setGiftable((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelectedInView = filtered.every((p) => giftable.has(p.id));

  return (
    <BlockStack gap="800">
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Products</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Manage which products from your Shopify catalog are giftable.
          </Text>
        </BlockStack>
        <Button variant="primary">Save</Button>
      </InlineStack>

      {/* Auto-include rule */}
      <Card padding="500">
        <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
          <BlockStack gap="050">
            <Text as="p" variant="bodyMd" fontWeight="semibold">Auto-include new products</Text>
            <Text as="p" variant="bodySm" tone="subdued">
              When you add a new product in Shopify, make it giftable automatically.
            </Text>
          </BlockStack>
          <Toggle on={autoInclude} onToggle={() => setAutoInclude((v) => !v)} />
        </InlineStack>
      </Card>

      {/* Product list */}
      <Card padding="0">
        <Box padding="400">
          <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center" gap="200" wrap>
              <Box minWidth="240px">
                <TextField
                  label=""
                  labelHidden
                  prefix={
                    <span style={{ width: 14, height: 14, display: 'inline-flex' }}>
                      <SearchIcon width={14} height={14} style={{ fill: '#6b6b73' }} />
                    </span>
                  }
                  placeholder="Search products…"
                  value={search}
                  onChange={setSearch}
                  autoComplete="off"
                />
              </Box>
              <InlineStack gap="200" blockAlign="center">
                <FilterPill label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
                <FilterPill label="In stock" active={filter === 'in-stock'} onClick={() => setFilter('in-stock')} />
                <FilterPill label="Out of stock" active={filter === 'out-of-stock'} onClick={() => setFilter('out-of-stock')} />
              </InlineStack>
              <InlineStack gap="200" blockAlign="center">
                <Text as="span" variant="bodySm" tone="subdued">
                  {giftable.size} of {ALL_PRODUCTS.length} giftable
                </Text>
                <Button
                  variant="plain"
                  onClick={() => {
                    setGiftable((prev) => {
                      const next = new Set(prev);
                      filtered.forEach((p) => {
                        if (allSelectedInView) next.delete(p.id);
                        else next.add(p.id);
                      });
                      return next;
                    });
                  }}
                >
                  {allSelectedInView ? 'Deselect all' : 'Select all'}
                </Button>
              </InlineStack>
            </InlineStack>
          </BlockStack>
        </Box>
        <Divider />
        {filtered.length === 0 ? (
          <Box padding="600">
            <Text as="p" variant="bodySm" tone="subdued" alignment="center">
              No products match your search.
            </Text>
          </Box>
        ) : (
          filtered.map((p, i) => (
            <div key={p.id}>
              {i > 0 && <Divider />}
              <Box padding="300">
                <InlineStack align="space-between" blockAlign="center" gap="300" wrap={false}>
                  <InlineStack gap="300" blockAlign="center" wrap={false}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: p.bg, flexShrink: 0 }} />
                    <BlockStack gap="050">
                      <Text as="p" variant="bodyMd" fontWeight="semibold">{p.name}</Text>
                      <InlineStack gap="200" blockAlign="center">
                        <Text as="span" variant="bodySm" tone="subdued">{p.price}</Text>
                        <Text as="span" variant="bodySm" tone="subdued">·</Text>
                        {p.inStock ? (
                          <Badge tone="success">In stock</Badge>
                        ) : (
                          <Badge tone="attention">Out of stock</Badge>
                        )}
                      </InlineStack>
                    </BlockStack>
                  </InlineStack>
                  <Toggle on={giftable.has(p.id)} onToggle={() => toggleProduct(p.id)} />
                </InlineStack>
              </Box>
            </div>
          ))
        )}
      </Card>
    </BlockStack>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        all: 'unset',
        cursor: 'pointer',
        padding: '6px 12px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 500,
        background: active ? '#1a1a1f' : '#fff',
        color: active ? '#fff' : '#1a1a1f',
        border: `1px solid ${active ? '#1a1a1f' : '#dcdcde'}`,
        transition: 'background 120ms, color 120ms',
      }}
    >
      {label}
    </button>
  );
}

