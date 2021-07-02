import React from 'react';
import { Card } from 'react-bootstrap';
import demoCardImg from '../../assets/gift_card_demo.jpg';


const GiftCard =(props)=>{
    return(
        <Card style={{ width: '16rem',margin:'3px',display:'inline-block' }}>
            <Card.Body>
                <Card.Img variant="top" src={demoCardImg} />
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Discount: {props.discount}%</Card.Subtitle>
                <Card.Text>
                {props.description}
                </Card.Text>
                <Card.Link className="btn btn-primary btn-sm" onClick={props.displayCardHandler}>Edit</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default GiftCard;