import fetch from 'node-fetch';

const vercelKey = (key, clientKey) => clientKey ? `${clientKey}-${key}` : key;

export default class VercelAdapter {
  constructor(logger, options) {
    this.logger = logger;
    this.options = options;
  }

  async get(key, clientKey) {
    const response = await fetch(
      `${this.options.EDGE_CONFIG_API_URL}/${this.options.EDGE_CONFIG_ID}/item/${vercelKey(key, clientKey)}?token=${this.options.EDGE_CONFIG_TOKEN}`,
    );
    return response.json();
  }

  async set(key, value, clientKey) {
    fetch(
      `${this.options.EDGE_CONFIG_VERCEL_API_URL}/${this.options.EDGE_CONFIG_ID}/items?teamId=${this.options.EDGE_CONFIG_VERCEL_TEAM_ID}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.options.EDGE_CONFIG_VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'create',
              key: vercelKey(key, clientKey),
              value,
            },
          ],
        }),
      },
    );
  }

  async del(key, clientKey) {
    fetch(
      `${this.options.EDGE_CONFIG_VERCEL_API_URL}/${this.options.EDGE_CONFIG_ID}/items?teamId=${this.options.EDGE_CONFIG_VERCEL_TEAM_ID}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.options.EDGE_CONFIG_VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'delete',
              key: vercelKey(key, clientKey),
              value: null,
            },
          ],
        }),
      },
    );
  }

  async getAllClientInfos() {
    const readItems = await fetch(
      `${this.options.EDGE_CONFIG_VERCEL_API_URL}/${this.options.EDGE_CONFIG_ID}/items?teamId=${this.options.EDGE_CONFIG_VERCEL_TEAM_ID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.options.EDGE_CONFIG_VERCEL_API_TOKEN}`,
        },
      },
    );
    const result = await readItems.json();
    return Promise.all(
      result.map(key => this.get(key))
    );
  }

  isMemoryStore() {
    return false;
  }
}

