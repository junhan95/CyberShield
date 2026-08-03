"use client";

import { useEffect, useRef, useState } from "react";
import { hotspots } from "./cutaway";
import type { Lang } from "./site-config";
import { asset } from "./site-config";

/**
 * The cutaway render with the original callouts turned into hotspots. Pointing
 * at a marker — or at its entry in the list — spotlights that part of the room
 * and raises the matching description. Everything is a button, so the same
 * pairing works from the keyboard and from a tap.
 */
export function CutawayMap({ lang, alt }: { lang: Lang; alt: string }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const current = hotspots.find((spot) => spot.id === active) ?? null;

  // The list scrolls, so a part picked on the render has to be brought into view.
  useEffect(() => {
    if (!active) return;
    const row = listRef.current?.querySelector(`[data-spot="${active}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const bind = (id: string) => ({
    onMouseEnter: () => setActive(id),
    onFocus: () => setActive(id),
    onClick: () => setActive((previous) => (previous === id ? null : id)),
  });

  return (
    <div
      className={active ? "cutaway is-active" : "cutaway"}
      onMouseLeave={() => setActive(null)}
    >
      <figure className="cutaway-stage">
        <img src={asset("/images/cutaway.webp")} width={1800} height={1009} alt={alt} />

        {/* Dims everything but a circle around the selected part. */}
        <span
          className="cutaway-spot"
          aria-hidden="true"
          style={
            current
              ? {
                  opacity: 1,
                  background: `radial-gradient(circle 150px at ${current.x}% ${current.y}%, rgba(18,20,22,0) 0, rgba(18,20,22,0) 72px, rgba(18,20,22,.8) 150px)`,
                }
              : undefined
          }
        />

        {hotspots.map((spot, index) => (
          <button
            key={spot.id}
            type="button"
            className={spot.id === active ? "cutaway-pin is-on" : "cutaway-pin"}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-pressed={spot.id === active}
            {...bind(spot.id)}
          >
            <span aria-hidden="true">{index + 1}</span>
            <em>{spot.title[lang]}</em>
          </button>
        ))}
      </figure>

      <ol className="cutaway-list" ref={listRef}>
        {hotspots.map((spot, index) => (
          <li key={spot.id}>
            <button
              type="button"
              data-spot={spot.id}
              className={spot.id === active ? "is-on" : undefined}
              aria-pressed={spot.id === active}
              {...bind(spot.id)}
            >
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>
                <strong>{spot.title[lang]}</strong>
                <small>{spot.detail[lang]}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
