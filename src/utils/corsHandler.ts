export interface CORSProxyConfig {
  enabled: boolean;
  proxyUrl?: string;
}

export class CORSHandler {
  private config: CORSProxyConfig;

  constructor(config: CORSProxyConfig = { enabled: true }) {
    this.config = {
      enabled: config.enabled,
      proxyUrl: config.proxyUrl || 'https://api.allorigins.win/get?url='
    };
  }

  async fetchWithCORSFallback(url: string): Promise<Response> {
    // Try direct fetch first
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (directError) {
      // If CORS proxy is disabled, re-throw the original error
      if (!this.config.enabled) {
        throw directError;
      }

      console.log('Direct fetch failed, trying CORS proxy...');
      
      try {
        const proxyUrl = `${this.config.proxyUrl}${encodeURIComponent(url)}`;
        const proxyResponse = await fetch(proxyUrl);
        
        if (!proxyResponse.ok) {
          throw new Error(`Proxy failed: HTTP ${proxyResponse.status}: ${proxyResponse.statusText}`);
        }
        
        const proxyData = await proxyResponse.json();
        
        // Create a mock response object for the proxy data
        return {
          ok: true,
          status: 200,
          statusText: 'OK',
          json: async () => JSON.parse(proxyData.contents),
          text: async () => proxyData.contents
        } as Response;
      } catch (proxyError) {
        // If proxy also fails, throw the original error
        console.error('CORS proxy also failed:', proxyError);
        throw directError;
      }
    }
  }

  updateConfig(config: Partial<CORSProxyConfig>) {
    this.config = { ...this.config, ...config };
  }
}

// Default instance
export const defaultCORSHandler = new CORSHandler();
