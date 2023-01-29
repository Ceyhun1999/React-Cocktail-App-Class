import { Component } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import Cocktail from "../cocktail/Cocktail";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            offCanvas: false,
        };
    }

    cocktailShow = (id) => {
        this.setState(({ offCanvas }) => ({
            offCanvas: !offCanvas,
            id,
        }));
    };

    render() {
        let { id, offCanvas } = this.state;
        return (
            <>
                <Header />
                <Main cocktailShow={this.cocktailShow} />
                <Footer />
                {offCanvas ? <Cocktail id={id} show={offCanvas} cocktailShow={this.cocktailShow} /> : null}
            </>
        );
    }
}
