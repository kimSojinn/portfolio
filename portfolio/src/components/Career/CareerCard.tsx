import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./CareerCard.module.css";

interface ExperienceItem {
  description: ReactNode;
  subDescription?: ReactNode[];
  stack?: string[];
}

interface CareerCardProps {
  period: string;
  company: string;
  role: string;
  experiences: ExperienceItem[];
}

const CareerCard = ({
  period,
  company,
  role,
  experiences,
}: CareerCardProps) => {
  const headingId = `${company}-heading`;

  return (
    <section className={styles.card} aria-labelledby={headingId}>
      <div className={styles.header}>
        <span className={styles.period}>{period}</span>
        <h3 id={headingId} className={styles.company}>
          {company}
        </h3>
        <p className={styles.role}>{role}</p>
      </div>

      <div className={styles.content}>
        {experiences.map((item, index) => (
          <ExperienceItemBlock
            key={index}
            item={item}
            index={index}
            company={company}
          />
        ))}
      </div>
    </section>
  );
};

interface ExperienceItemBlockProps {
  item: ExperienceItem;
  index: number;
  company: string;
}

const ExperienceItemBlock = ({
  item,
  index,
  company,
}: ExperienceItemBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleId = `${company}-desc-${index}`;

  return (
    <div className={styles.experienceItem}>
      <p className={styles.description}>{item.description}</p>

      {item.subDescription && item.subDescription.length > 0 && (
        <div className={styles.toggleRow}>
          <button
            className={styles.toggleButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls={toggleId}
          >
            {isOpen ? "▲" : "▼"}
          </button>

          {isOpen && (
            <div id={toggleId} className={styles.inlineSubDescriptionBlock}>
              {item.subDescription.map((line, i) => (
                <span key={i} className={styles.inlineSubDescription}>
                  {line}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {item.stack && item.stack.length > 0 && (
        <ul className={styles.stackList} aria-label="사용 기술 스택">
          {item.stack.map((tech, i) => (
            <li key={i} className={styles.stackItem}>
              {tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CareerCard;
