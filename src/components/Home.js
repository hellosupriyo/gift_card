import React,{useEffect, useState} from 'react';
import './Home.css';
import GiftCard from './gift-card/GiftCard';
import JsonData from '../MOCK_DATA.json';
import ReactPaginate from 'react-paginate';
import { Button,ButtonToolbar } from 'react-bootstrap';
import AddCardModal from './gift-card/AddCardModal';

const Home = (props)=>{
    useEffect(()=>{
        setGiftCards(JsonData.reverse());
    },[]);
    const [giftCards,setGiftCards]=useState([]);
    const [pageNumber, setPageNumber]=useState(0);
    const [showModal,setShowModal]=useState(false);
    const [singleCardDeatails,setSingleCardDetails]=useState({id:0});

    const usersPerPage = 4;
    const pagesVisited = pageNumber * usersPerPage;

    const displayCards = giftCards.slice(pagesVisited,(pagesVisited + usersPerPage))
                                  .map(cardData=>{
                                    return <GiftCard title={cardData.title} 
                                                    discount={cardData.discount}
                                                     key={cardData.id} 
                                                     description={cardData.description}
                                                     
                                                     displayCardHandler={()=>displayCardDetails(cardData.id)}/>
                                  });

    const pageCount= Math.ceil(giftCards.length / usersPerPage);
    const changePageHandeler= ({selected})=>{
        setPageNumber(selected);
    }
    const hideModelHandeler = ()=>{
        setShowModal(false);
    }
    const handelCardSave = (data)=>{
        let giftCardArray = giftCards;
        // console.log(giftCardArray);
        if(data.id === 0){
            let newData ={ ...data,id:giftCardArray[0].id+1};
            giftCardArray.unshift(newData);
            setGiftCards(giftCardArray);
            setPageNumber(0);
            setShowModal(false);
        }

        if(data.id !== 0) {
            let index = giftCardArray.findIndex( card => card.id === data.id );
            giftCardArray[index].title = data.title
            giftCardArray[index].discount = data.discount
            giftCardArray[index].description = data.description
            setGiftCards(giftCardArray);
            setShowModal(false);
        }
        
    }
    const displayCardDetails=(id)=>{
        let giftCardArray = giftCards;
        let cardDeatils = giftCardArray.reduce((accu,current)=>{
            if(current.id === id){
                accu=current;
            }
            return accu;
        },{});
        setSingleCardDetails(cardDeatils);
        setShowModal(true);
        
    }
    
    const showModalHandler=()=>{
        setSingleCardDetails({id:0});
        setShowModal(true)
    }

    return(
        <React.Fragment>
            <ButtonToolbar className="add_card_toolbar">
                <Button variant="success"
                onClick={showModalHandler}
                > Add Gift Card </Button>
                <AddCardModal 
                    show={showModal}
                    onHide={hideModelHandeler}
                    cardSaveHandeler={(data)=>handelCardSave(data)}
                    displayData={singleCardDeatails}
                />
            </ButtonToolbar>
            { displayCards }
            <ReactPaginate 
                className="pagination"
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={ changePageHandeler }
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </React.Fragment>
    );
}

export default Home;