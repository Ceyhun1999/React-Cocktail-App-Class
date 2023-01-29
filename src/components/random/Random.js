import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CocktailServices from "../services/CocktailServices";
import Circular from "../spinner/Circular";
import "./Random.css";

export default class Random extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cocktail: {},
        };
    }

    cocktailServices = new CocktailServices();

    componentDidMount() {
        this.cocktailServices.getRandomCocktail().then((res) =>
            this.setState({
                loading: false,
                cocktail: res,
            })
        );
    }

    render() {
        let { loading, cocktail } = this.state;
        return <>{loading ? <Circular /> : <View cocktail={cocktail} />}</>;
    }
}

const View = ({ cocktail }) => {
    const { isAlc, cat, name, img, desc, ings } = cocktail;
    return (
        <div className="container">
            <Card className="border-1">
                <Row>
                    <Col lg={6}>
                        <Card.Img variant="top" src={img} alt={name} />
                    </Col>
                    <Col lg={6}>
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
                            <Card.Text className="rand-desc">{desc}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
