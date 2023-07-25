import styles from "../../conference.module.css";
import { speakerJson } from "../page";

// Static Data fetching
function fetchSpeakerInfo(slug){
  console.log('value', speakerJson);

  console.log('keys', speakerJson.keys);
  console.log('slug', decodeURI(slug));
  const speakerInfo = speakerJson.speakers?.find(
    (speaker) => speaker.name == decodeURI(slug));
  //console.log('names', speakerJson.speakers?.map((s) => s?.name));
  console.log('speakerInfo', speakerInfo);
  return speakerInfo;
}

export default function Page({params}) {
    const speakerInfo = fetchSpeakerInfo(params.slug);
    if(!speakerInfo) return (<><div>data not found, go back to speakers list and try again.</div></>);
    const {id, name, bio, sessions} = speakerInfo;
    //console.log(name, bio, sessions);
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
  