import { render, screen } from '@testing-library/svelte';
import { beforeAll, describe, expect, test } from 'vitest';

import Page from './+page.svelte';

import { maps } from '$lib/data';

test('should render h1', () => {
  render(Page, { props: { data: { maps } } });

  const heading = screen.getByRole('heading', { name: 'ICARUS Interactive Map' });
  expect(heading).toBeInTheDocument();
});

describe('should render map anchors', () => {
  describe('About Olympus', () => {
    let anchor: HTMLAnchorElement;

    beforeAll(() => {
      render(Page, { props: { data: { maps } } });
      anchor = screen.getByRole('link', { name: 'Map of Olympus' });
    });

    test('should render Olympus map anchor', () => {
      expect(anchor).toBeInTheDocument();
    });

    test('should href to Olympus map', () => {
      expect(anchor.getAttribute('href')).toBe('/olympus');
    });
  });

  describe('About Styx', () => {
    let anchor: HTMLAnchorElement;

    beforeAll(() => {
      render(Page, { props: { data: { maps } } });
      anchor = screen.getByRole('link', { name: 'Map of Styx' });
    });

    test('should render Styx map anchor', () => {
      expect(anchor).toBeInTheDocument();
    });

    test('should href to Styx map', () => {
      expect(anchor.getAttribute('href')).toBe('/styx');
    });
  });
});
