import { Component } from "react";
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import CocktailServices from "../services/CocktailServices";
import "./List.css";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cocktailArr: [],
            letter: "a",
            active: 0,
        };
    }

    cocktailServices = new CocktailServices();

    componentDidMount() {
        this.cocktailServices.getCocktailByLetter(this.state.letter).then((res) =>
            this.setState({
                cocktailArr: res,
            })
        );
    }

    getCocktailByLetter = (i, letter) => {
        this.cocktailServices.getCocktailByLetter(letter).then((res) =>
            this.setState({
                cocktailArr: res,
                active: i,
            })
        );
    };

    render() {
        let { active, cocktailArr } = this.state;
        let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let letters = [];
        for (let i = 0; i < abc.length; i++) {
            letters.push(
                <Pagination.Item
                    onClick={() => this.getCocktailByLetter(i, abc[i].toLowerCase())}
                    key={i}
                    active={i === active}>
                    {abc[i]}
                </Pagination.Item>
            );
        }

        return (
            <Container className="py-5">
                <h2>Cocktails By First Letter</h2>
                <div className="pagin">
                    <Pagination>{letters}</Pagination>
                </div>
                <Row sm={2} xs={1} md={3} lg={4} className="g-4">
                    {cocktailArr.map((item, idx) => (
                        <Col key={idx}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={item.img} alt={item.name} />
                                <Card.Body>
                                    <Card.Title>
                                        {item.name}{" "}
                                        <i>
                                            {item.cat} - {item.isAlc}
                                        </i>{" "}
                                    </Card.Title>
                                    <Card.Text className="ing">
                                        <b>Ingredients: </b> <i>{item.ings.join(", ")}</i>
                                    </Card.Text>
                                    <Card.Text className="cardDesc">{item.desc}</Card.Text>
                                </Card.Body>
                                <Button
                                    onClick={() => this.props.cocktailShow(item.id)}
                                    variant="danger"
                                    size="sm">
                                    Read more...
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}
