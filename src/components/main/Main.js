import List from "../list/List";
import Random from "../random/Random";

export default function Main({ cocktailShow }) {
    return (
        <main className="py-3">
            <Random />
            <List cocktailShow={cocktailShow}/>
        </main>
    );
}
