import React from "react";
import { createPortal } from "react-dom";
import "./HoverCard.css";

const HoverCard = ({ visible, movie, onAddClick, isInList, position }) => {
  if (!visible) return null;

  const node = (
    <div
      className="hover-card"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="overlay-top">
        <button className="play-btn">▶</button>
        <div className="movie-info">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-meta">⭐ 8.7 • 2019</div>
          <div className="movie-overview">Quick synopsis of {movie.title}.</div>
        </div>
      </div>

      <div className="movie-actions">
        <button className="add-btn" onClick={onAddClick}>
          {isInList ? "✓" : "+"}
        </button>
        <span className="rating">⭐ 8.7</span>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default HoverCard;
