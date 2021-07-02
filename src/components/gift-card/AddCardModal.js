import './AddCardModal.css';
import React , {useState , useEffect} from 'react';
import { Modal,Button,Alert } from 'react-bootstrap';


const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

const AddCardModal = (props)=>{

    const [showError,setShowError] = useState(false);

    useEffect(()=>{
        if(props.displayData.id !== 0){
            setFormFields((prevState)=>({
                ...prevState,
                id:props.displayData.id,
                discount:props.displayData.discount,
                cardName:props.displayData.title,
                description:props.displayData.description
            }));
            
        } else{
            setFormFields((prevState)=>({
                ...prevState,
                id:0,
                discount:null,
                cardName:null,
                description:null
            }));
        }
    },[props.displayData])

    
    const [formFields,setFormFields]=useState({
        id: 0,
        cardName: null,
        discount:null,
        description: null,
        formErrors:{
            cardName:"",
            discount:"",
            description:""
        }
    });

    const handelChange=e=>{
        e.preventDefault();
        setShowError(false);
        const {name, value}= e.target;
        let formErrors = { ...formFields.formErrors };
        

        switch(name){
            case "cardName":
                formErrors.cardName = value.length < 3 && value.length > 0 ? "Minimum 3 characters is required." : ""
            break;
            case "description":
                formErrors.description = value.length < 10 && value.length > 0 ? "Minimum 10 characters is required." : ""
            break;
            case "discount":
                formErrors.discount = value.length < 1 && value.length > 0  ? "Discount Value is required." : ""
            break;
            default:
            break;
        }
        setFormFields(prevState=>({
            ...prevState,
            formErrors,
            [name]:value}));

    };

    const handelSubmit= e =>{
        e.preventDefault();
        if(formValid(formFields)){
            let newData={
                id:formFields.id,
                title:formFields.cardName,
                discount:formFields.discount,
                description:formFields.description
            };
            props.cardSaveHandeler(newData);

        } else {
            setShowError(true);
        }
    }
    const {formErrors } = formFields;
    return(
        
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Gift Card Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            { showError ? <Alert key={1} variant={'danger'} >
                    All fields are required!
                </Alert> : '' }
                <form onSubmit={handelSubmit} noValidate>
                    <div className="container">
                    <div className="form-group row">
                        <label htmlFor="cardName" className="col-sm-3 col-form-label required">Card Name </label>
                        <div className="col-sm-9">
                        <input 
                            type="text"
                            value={formFields.cardName ?? '' }
                            className="form-control"
                            placeholder="Card Name"
                            name="cardName"
                            noValidate
                            onChange={handelChange}
                            />
                            {formErrors.cardName.length> 0 && (<span className="errorMessage">{formErrors.cardName}</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="discount" className="col-sm-3 col-form-label required">Discount (%)</label>
                        <div className="col-sm-9">
                        <input 
                            type="text"
                            value={formFields.discount ?? '' }
                            className="form-control"
                            placeholder="Discount(%)"
                            name="discount"
                            noValidate
                            onChange={handelChange}
                            />
                            {formErrors.discount.length> 0 && (<span className="errorMessage">{formErrors.discount}</span>)}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-sm-3 col-form-label required">Description</label>
                        <div className="col-sm-9">
                            <textarea 
                                className="form-control"
                                placeholder="Description"
                                name="description"
                                noValidate
                                value={formFields.description ?? '' }
                                onChange={handelChange}
                                />
                                {formErrors.description.length> 0 && (<span className="errorMessage">{formErrors.description}</span>)}
                        </div>
                    </div>

                    <div className="createAccount" >
                        <button type="submit" className="btn btn-sm btn-success pull-right">Save Card</button>
                    </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCardModal;