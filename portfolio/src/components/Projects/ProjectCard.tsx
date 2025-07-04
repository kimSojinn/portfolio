import type { ReactNode } from "react";

import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  period: string;
  organization?: string;
  subDescription?: string;
  description: ReactNode;
  role: string;
  stack?: string[];
  link?: string;
  content?: ReactNode;
}

const ProjectCard = ({
  period,
  organization,
  subDescription,
  description,
  role,
  stack,
  link,
  content,
}: ProjectCardProps) => {
  return (
    <div className={styles.card}>
      <span className={styles.period}>{period}</span>
      {organization && <h3 className={styles.organization}>{organization}</h3>}
      {stack && (
        <ul className={styles.stackList}>
          {stack.map((tech, idx) => (
            <li key={idx} className={styles.stackItem}>
              {tech}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.description}>{description}</div>
      {subDescription && (
        <p className={styles.subDescription}>{subDescription}</p>
      )}
      <p className={styles.role}>{role}</p>

      {content && <div className={styles.content}>{content}</div>}

      {link && (
        <a
          href={link}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗 링크 이동
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
