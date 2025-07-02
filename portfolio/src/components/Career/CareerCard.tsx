import styles from "./CareerCard.module.css";

interface ExperienceItem {
  description: string;
  stack: string[];
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
  return (
    <section className={styles.card} aria-labelledby={`${company}-heading`}>
      <div className={styles.header}>
        <span className={styles.period}>{period}</span>
        <h3 id={`${company}-heading`} className={styles.company}>
          {company}
        </h3>
        <p className={styles.role}>{role}</p>
      </div>

      <div className={styles.body}>
        {experiences.map((item, index) => (
          <div key={index} className={styles.experienceItem}>
            <li className={styles.description}>{item.description}</li>
            <ul className={styles.stackList} aria-label="사용 기술 스택">
              {item.stack.map((tech, i) => (
                <li key={i} className={styles.stackItem}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerCard;
