import React from 'react';
import Card from 'react-bootstrap/Card';
import { MDBContainer } from 'mdbreact';
//import Img from '../photos/hospital.jpg';
//import Img from './hospitalbg.jpg'
import Img from './WallpaperV2.png'

function Homeimage() {
  return (
    <div>
      <Card className="text-white">
        <Card.Img src={Img} alt="Card image" style={{ width: '100%' }}/>
        <Card.ImgOverlay style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Title>
            <MDBContainer>
              <h1 className="font-weight-bold text-light" style={{fontSize:'4rem', textShadow:'5px 5px 10px black'}}>Asociación Cuidados Paliativos de Sarchí</h1>
              <br />
              <p className="font-weight-bold text-light" style={{fontSize:'3rem', textShadow:'5px 5px 10px black', marginTop:'1rem'}}>Expediente Digital</p>
            </MDBContainer>
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default Homeimage;