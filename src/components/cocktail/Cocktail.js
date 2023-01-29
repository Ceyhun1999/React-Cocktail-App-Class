import { Component } from "react";
import { Card, Offcanvas } from "react-bootstrap";
import CocktailServices from "../services/CocktailServices";

export default class Cocktail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktail: {},
            id: null,
        };
    }

    cocktailService = new CocktailServices();

    componentDidMount() {
        this.getCocktailById();
    }

    getCocktailById = () => {
        this.cocktailService.getCocktailById(this.props.id).then((res) =>
            this.setState({
                cocktail: res,
                id: this.props.id,
            })
        );
    };

    render() {
        let { show, cocktailShow } = this.props;
        const { img, name, isAlc, cat, ings, desc } = this.state.cocktail;
        return (
            <Offcanvas show={show} onHide={cocktailShow}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card>
                        <Card.Img variant="top" src={img} alt={name} />
                        <Card.Body>
                            <Card.Title>
                                <h2>{name}</h2>
                                <br />
                                <small>{isAlc + " - " + cat}</small>
                            </Card.Title>
                            <h4>Ingredients: </h4>
                            <ul>
                                {ings?.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <Card.Text>{desc}</Card.Text>
                        </Card.Body>
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>
        );
    }
}
