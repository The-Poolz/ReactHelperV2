import React, { type ReactNode } from "react";
import "./NFTIdButton.css";

export interface NFTIdButtonProps {
  readonly tokenId: bigint;
  readonly tokenURI?: string;
  readonly onClick: (tokenId: bigint, tokenURI: string) => void;
  readonly disabled?: boolean;
  readonly children?: ReactNode;
  readonly variant?: 'default' | 'primary' | 'secondary' | 'success';
  readonly size?: 'small' | 'default' | 'large';
  readonly className?: string;
}

export function NFTIdButton({
  tokenId,
  tokenURI,
  onClick,
  disabled = false,
  children,
  variant = 'default',
  size = 'default',
  className
}: NFTIdButtonProps) {
  const handleClick = () => {
    if (!disabled && tokenURI) {
      onClick(tokenId, tokenURI);
    }
  };

  const getClassNames = () => {
    const classes = ['nft-id-button'];

    if (size !== 'default') {
      classes.push(`nft-id-button--${size}`);
    }

    if (variant !== 'default') {
      classes.push(`nft-id-button--${variant}`);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || !tokenURI}
      className={getClassNames()}
      title={tokenURI ? `Click to view metadata for NFT ${tokenId.toString()}` : 'Token URI not available'}
    >
      {children || tokenId.toString()}
    </button>
  );
}
