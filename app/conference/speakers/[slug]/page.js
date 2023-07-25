import styles from "../../conference.module.css";

async function fetchSpeakers(){
  const response = await fetch(
    "https://raw.githubusercontent.com/adhithiravi/Consuming-GraphqL-Apollo/master/api/data/speakers.json",
    {next:{revalidate: 300}}
  );

  const data = await response.json();
  return data;
}
// Static Data fetching
async function fetchSpeakerInfo(slug){
  const speakerJson = await fetchSpeakers();
  const speakerInfo = speakerJson?.speakers?.find(
    (speaker) => speaker.name == decodeURI(slug));
  return speakerInfo;
}

export default async function Page({params}) {
    const speakerInfo = await fetchSpeakerInfo(params.slug);
    if(!speakerInfo) return (<h1 className={styles.titleText}>Data not found, go back to speakers list and try again.</h1>);
    const {id, name, bio, sessions} = speakerInfo;
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.titleText}>{name}</h3>
            <h5 className={styles.descText}>About: {bio}</h5>
            {sessions &&
                sessions.map(({name, id}) => (
                    <div key={id}>
                        <h5 className={styles.descText}>Session: {name}</h5>
                    </div>
                ))}
        </div>
    );
  }
  