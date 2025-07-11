import React from "react";
import type { NFTMetadataState } from "../hooks/useNFTMetadata";
import "./NFTMetadataModal.css";

export interface NFTMetadataModalProps {
  readonly nftData: NFTMetadataState | null;
  readonly onClose: () => void;
}

// Helper function to convert IPFS URLs to HTTP URLs
const convertIPFSUrl = (url: string): string => {
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
};

export function NFTMetadataModal({ nftData, onClose }: NFTMetadataModalProps) {
  if (!nftData) return null;

  return (
    <div
      className="nft-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        className="nft-modal-container"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          onClick={onClose}
          className="nft-modal-close-button"
          aria-label="Close modal"
        >
          ×
        </button>

        <h3 className="nft-modal-title">
          NFT Metadata - Token ID: {nftData.tokenId.toString()}
        </h3>

        <div className="nft-modal-section">
          <strong>Token URI:</strong>
          <br />
          <a
            href={nftData.tokenURI}
            target="_blank"
            rel="noopener noreferrer"
            className="nft-modal-token-uri"
          >
            {nftData.tokenURI}
          </a>
        </div>

        {nftData.isLoading && (
          <div className="nft-modal-loading">
            Loading metadata...
          </div>
        )}

        {nftData.error && (
          <div className="nft-modal-error">
            <strong>Error:</strong> {nftData.error}
          </div>
        )}

        {nftData.metadata && !nftData.isLoading && (
          <div>
            <strong>Metadata:</strong>

            {/* Show NFT Name if available */}
            {nftData.metadata.name && (
              <div className="nft-modal-metadata-section">
                <strong>Name:</strong> {nftData.metadata.name}
              </div>
            )}

            {/* Show NFT Description if available */}
            {nftData.metadata.description && (
              <div className="nft-modal-metadata-section">
                <strong>Description:</strong> {nftData.metadata.description}
              </div>
            )}

            {/* Show NFT Image if available (with IPFS support) */}
            {nftData.metadata.image && (
              <div className="nft-modal-metadata-section">
                <strong>Image:</strong>
                <br />
                <img
                  src={convertIPFSUrl(nftData.metadata.image)}
                  alt={nftData.metadata.name ?? 'NFT'}
                  className="nft-modal-image"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="nft-modal-image-caption">
                  Original URL: {nftData.metadata.image}
                </div>
              </div>
            )}

            {/* Show attributes if available */}
            {nftData.metadata.attributes && Array.isArray(nftData.metadata.attributes) && (
              <div className="nft-modal-metadata-section">
                <strong>Attributes:</strong>
                <div className="nft-modal-attributes">
                  {nftData.metadata.attributes.map((attr, index) => (
                    <div
                      key={`${attr.trait_type ?? attr.key ?? 'attr'}-${index}`}
                      className="nft-modal-attribute"
                    >
                      <strong>{attr.trait_type ?? attr.key}:</strong> {attr.value}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full JSON for debugging */}
            <details className="nft-modal-json-details">
              <summary className="nft-modal-json-summary">
                Show Raw JSON
              </summary>
              <pre className="nft-modal-json-pre">
                {JSON.stringify(nftData.metadata, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Show message if no metadata loaded yet */}
        {!nftData.metadata && !nftData.isLoading && !nftData.error && (
          <div className="nft-modal-waiting">
            Waiting for metadata to load...
          </div>
        )}
      </div>
    </div>
  );
}
