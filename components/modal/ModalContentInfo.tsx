'use client';

import { Content } from '@/types';

interface ModalContentInfoProps {
  content: Content;
}

export default function ModalContentInfo({ content }: ModalContentInfoProps) {
  return (
    <div className="modal-info-section">
      {/* Meta badges */}
      <div className="modal-meta">
        {content.year && (
          <span className="modal-meta-year">{content.year}</span>
        )}
        {content.contentRating && (
          <span className="modal-meta-rating">{content.contentRating}</span>
        )}
        {content.episodes && (
          <span className="modal-meta-text">{content.episodes} ตอน</span>
        )}
        {content.status && (
          <span className="modal-meta-status">{content.status}</span>
        )}
        {content.rating && (
          <span className="modal-meta-stars">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#FFBF00' }}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {content.rating}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="modal-description">
        {content.longDescription || content.description}
      </p>

      {/* Details - inline labeled text */}
      <div className="modal-details">
        {content.cast && content.cast.length > 0 && (
          <p className="modal-detail-line">
            <span className="modal-detail-label">นักแสดง: </span>
            <span className="modal-detail-value">{content.cast.slice(0, 4).join(', ')}</span>
          </p>
        )}
        {content.genres && content.genres.length > 0 && (
          <p className="modal-detail-line">
            <span className="modal-detail-label">หมวดหมู่: </span>
            <span className="modal-detail-value">{content.genres.join(', ')}</span>
          </p>
        )}
        <p className="modal-detail-line">
          <span className="modal-detail-label">ประเภท: </span>
          <span className="modal-detail-value">{content.type}</span>
        </p>
      </div>
    </div>
  );
}
