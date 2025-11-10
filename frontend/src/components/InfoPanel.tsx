import React from "react";
import ButtonComponent, { ButtonStyleType } from "./Button";

export interface InfoPanelComponentProps<E> {
  title: string;
  ariaLabel: string;
  data: E[];
  buttons?: {
    text: string;
    onClick?: () => void;
    stylesButton: ButtonStyleType;
    icon?: React.ReactNode;
  }[];
  renderItem?: (item: E) => React.ReactNode;
  width?: number | string;
}

export default function InfoPanelComponent<E extends { id?: string | number }>(
  props: InfoPanelComponentProps<E>
) {
  const {
    title,
    ariaLabel,
    data,
    buttons = [],
    renderItem,
    width = 340,
  } = props;

  return (
    <section
      aria-label={ariaLabel}
      style={{
        width,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h2
        style={{
          margin: 0,
          paddingBottom: 8,
          borderBottom: "1px solid #eee",
          fontSize: 18,
        }}
      >
        {title}
      </h2>

      {data.length === 0 && <p style={{ color: "#888" }}>Nenhuma informação encontrada.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((item, index) => (
          <div
            key={item.id ?? index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 10,
              background: "#fafafa",
            }}
          >
            {renderItem ? (
              renderItem(item)
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                {"avatar_url" in item && (
                  <img
                    src={(item as any).avatar_url}
                    alt="avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  {"login" in item && (
                    <p style={{ margin: 0, fontWeight: 500 }}>
                      {(item as any).login}
                    </p>
                  )}
                  {"username" in item && (
                    <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
                      {(item as any).username}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 6 }}>
              {buttons.map((btn, i) => (
                <ButtonComponent
                  key={i}
                  stylesButton={btn.stylesButton}
                  onClick={btn.onClick!}
                  icon={btn.icon}
                  text={btn.text}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
