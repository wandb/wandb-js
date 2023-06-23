import {config} from './lib/config.js';

export interface Settings {
  apiKey?: string;
  baseUrl: string;
  entity?: string;
  offline?: boolean;
  silent?: boolean;
}

export const defaultSettings = () => ({
  apiKey: config().API_KEY || '',
  baseUrl: config().API_URL || 'https://api.wandb.ai',
  offline: config().MODE === 'offline',
  entity: config().ENTITY,
});

export const settingsWithOverrides = (overrides?: Partial<Settings>) => ({
  ...defaultSettings(),
  ...overrides,
});
