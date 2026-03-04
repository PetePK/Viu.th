'use client';

import { Content } from '@/types';

interface ModalMoreLikeThisProps {
  recommendations: Content[];
  onSelectContent: (content: Content) => void;
}

export default function ModalMoreLikeThis({
  recommendations,
  onSelectContent,
}: ModalMoreLikeThisProps) {
  if (recommendations.length === 0) {
    return (
      <div className="modal-no-recommendations">
        <p>ไม่พบเนื้อหาที่คล้ายกัน</p>
      </div>
    );
  }

  return (
    <div className="modal-more-like-this">
      {recommendations.map((item) => (
        <div
          key={item.id}
          className="modal-rec-card"
          onClick={() => onSelectContent(item)}
        >
          <div className="modal-rec-thumb">
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
            />
            <div className="modal-rec-overlay">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>

          <div className="modal-rec-info">
            <div className="modal-rec-meta">
              {item.year && <span className="modal-rec-year">{item.year}</span>}
              {item.rating && (
                <span className="modal-rec-rating">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#FFBF00' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {item.rating}
                </span>
              )}
            </div>

            <h4 className="modal-rec-title">{item.title}</h4>

            {item.description && (
              <p className="modal-rec-desc">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
