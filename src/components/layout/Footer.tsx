import { profile } from "@/data/profile";
import styles from "@/components/sections/story.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="frame">
        <p>{profile.name}</p>
        <p>{profile.location}</p>
        <p>{profile.status}</p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </footer>
  );
}
