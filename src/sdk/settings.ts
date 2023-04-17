export interface Settings {
  apiKey: string;
  baseUrl: string;
  offline: boolean;
  silent?: boolean;
}

export const defaultSettings = {
  apiKey: process.env.WANDB_API_KEY || '',
  baseUrl: process.env.WANDB_BASE_URL || 'https://api.wandb.ai',
  offline: process.env.WANDB_MODE === 'offline',
};

export const settingsWithOverrides = (overrides?: Partial<Settings>) => {
  return Object.assign({}, defaultSettings, overrides);
};
