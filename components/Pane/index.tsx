import { IAnime } from "@/types"
import Card from "../Card";
import styles from '../../styles/pane.module.scss'

interface IPaneProps {
    data: IAnime[];
}

const Pane = ({data}:IPaneProps) => {
    return(<div className={styles.cards}>
        {data.map((item) => <Card key = {item.mal_id} item={item}/>)}
    </div>)

}

export default Pane;