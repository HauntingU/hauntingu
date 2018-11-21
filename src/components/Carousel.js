import React from 'react';
import { withRouteData, Link } from 'react-static'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logoImg from '../images/halloween-background-wide-1.jpg'

class HighlightCarousel extends React.Component {
  onClickItem = (item) => {
    console.log("Clicked", item)
  }
  onClickThumb = (thumb) => {
    console.log("Clicked", thumb)
  }

  render() {
    const {highlights} = this.props
    return (
      <div style={{position: 'relative', maxHeigth: 600}}>
        <img src={logoImg} style={{position: 'absolute', top: 0, width: '100%', height: '100%'}} />
        <div style={{width: '80%', margin: '0 auto'}}>
          <Carousel 
            autoPlay
            infiniteLoop
            interval={3000}
            showArrows={true} 
            showThumbs={false}
            onClickItem={this.onClickItem} 
            onClickThumb={this.onClickThumb}
          >
            {highlights.map(highlight => (
              <img key={highlight.slug} src={highlight.image} style={{objectFit: 'cover', maxHeight: 600}}/>
            ))}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default withRouteData(HighlightCarousel)
