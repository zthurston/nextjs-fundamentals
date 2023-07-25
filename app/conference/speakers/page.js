import Link from "next/link";
import styles from "../conference.module.css";

// Static Data fetching
async function fetchSpeakers(){
  const response = await fetch(
    "https://raw.githubusercontent.com/adhithiravi/Consuming-GraphqL-Apollo/master/api/data/speakers.json",
    {next:{revalidate: 300}}
  );

  const data = await response.json();
  return data;
}

export default async function Page() {
    const data = await fetchSpeakers();

    return (
      <>
      <div className={styles.parentContainer}>
        <div className="self-start whitespace-nowrap rounded-lg bg-gray-700 px-3 py-1 text-sm font-medium tabular-nums text-gray-100">
          Last Rendered: {new Date().toLocaleTimeString()}
        </div>
        <h1>Welcome to the Globomatics Conference Speakers page!</h1>
        {data.speakers.map(({id, name, bio}) =>(
          <div key={id} className={styles.infoContainer}>
            <Link
              className={styles.bgLinks} 
              href={`/conference/speakers/${name}`} 
              >
              <h3 className={styles.titleText}>{name}</h3>
            </Link>
            <h5 className={styles.descText}>{bio}</h5>
          </div>
        ))}
      </div>
      </>
    )
  }
  