import styles from './index.module.scss';

export default function ConversationTypeForm() {
  return (
    <form className={styles.conversationTypeForm}>
      <div>
        <input className={styles.radio} type="radio" name="converationType" id="private" />
        <label className={styles.radioLabel} htmlFor="private">
          Private
        </label>
      </div>
      <div>
        <input className={styles.radio} type="radio" name="converationType" id="group" />
        <label className={styles.radioLabel} htmlFor="group">
          Group
        </label>
      </div>
    </form>
  );
}
