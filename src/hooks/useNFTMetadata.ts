import { useState } from "react";

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{
    trait_type?: string;
    key?: string;
    value: any;
  }>;
  [key: string]: any;
}

export interface NFTMetadataState {
  tokenId: bigint;
  tokenURI: string;
  metadata?: NFTMetadata;
  isLoading: boolean;
  error?: string;
}

export interface UseNFTMetadataReturn {
  selectedNFT: NFTMetadataState | null;
  isLoading: boolean;
  fetchMetadata: (tokenId: bigint, tokenURI: string) => Promise<void>;
  clearMetadata: () => void;
}

export function useNFTMetadata(): UseNFTMetadataReturn {
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadataState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMetadata = async (tokenId: bigint, tokenURI: string) => {
    setIsLoading(true);
    setSelectedNFT({ tokenId, tokenURI, isLoading: true });

    try {
      const metadataResponse = await fetch(tokenURI);

      if (!metadataResponse.ok) {
        throw new Error(`HTTP ${metadataResponse.status}: ${metadataResponse.statusText}`);
      }

      const metadata = await metadataResponse.json();

      setSelectedNFT({ tokenId, tokenURI, metadata, isLoading: false });
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSelectedNFT({
        tokenId,
        tokenURI,
        metadata: undefined,
        error: `Failed to load metadata: ${errorMessage}`,
        isLoading: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMetadata = () => {
    setSelectedNFT(null);
    setIsLoading(false);
  };

  return {
    selectedNFT,
    isLoading,
    fetchMetadata,
    clearMetadata
  };
}
