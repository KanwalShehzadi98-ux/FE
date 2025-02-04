import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faDownload, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import './Analytics.css';
import logo from "../Images/heatmap.png";
import bargraph from "../Images/bargraph.png";
import linegraph from "../Images/linegraph.png";
import roc from "../Images/roc.png";
import precisionrecall from "../Images/precisionrecall.png";
import confmatrix from "../Images/confmatrix.png";
import timeseries from "../Images/timeseries.png";
import scatter from "../Images/scatter.jpeg";
import histogram from "../Images/histogram.png";
import box from "../Images/box.png";
import gif from "../Images/gif.gif";

const Analytics = () => {
  const [hoveredSection, setHoveredSection] = useState(null);

  const sections = [
    { title: 'Heatmap', id: 'heatmap-box', imgSrc: logo },
    { title: 'Bar Graph', id: 'bar-graph-box', imgSrc: bargraph },
    { title: 'Line Graph', id: 'line-graph-box', imgSrc: linegraph },
    { title: 'ROC Curve', id: 'roc-curve-box', imgSrc:  roc},
    { title: 'Precision-Recall Curve', id: 'pr-curve-box', imgSrc:  precisionrecall},
    { title: 'Confusion Matrix', id: 'confusion-matrix-box', imgSrc:  confmatrix},
    { title: 'Time Series Plot', id: 'time-series-box', imgSrc:  timeseries},
    { title: 'Scatter Plot', id: 'scatter-plot-box', imgSrc:  scatter},
    { title: 'Histogram', id: 'histogram-box', imgSrc: histogram },
    { title: 'Box Plot', id: 'box-plot-box', imgSrc: box },
    { title: 'GIF Visualization', id: 'gif-box', imgSrc: gif },
  ];

  const handleMouseEnter = (section) => {
    setHoveredSection(section);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  const downloadGraph = async (graphId, graphTitle) => {
    const graphElement = document.getElementById(graphId);

    if (graphElement) {
      if (graphId === 'gif-box') {
        const gifImg = graphElement.querySelector('img');
        if (gifImg && gifImg.src) {
          try {
            const response = await fetch(gifImg.src);
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${graphTitle}.gif`;
            link.click();

            URL.revokeObjectURL(link.href);
          } catch (error) {
            console.error(`Error downloading the GIF: ${error}`);
          }
        }
      } else {
        const canvas = await html2canvas(graphElement, { backgroundColor: null });
        const ctx = canvas.getContext('2d');
        ctx.font = '24px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'right';
        ctx.fillText('EYESPY', canvas.width - 10, 30);

        const link = document.createElement('a');
        link.download = `${graphTitle}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } else {
      console.error(`Graph element with id ${graphId} not found.`);
    }
  };

  const openGraphInNewTab = (graphId, graphTitle) => {
    const graphElement = document.getElementById(graphId);
    if (graphElement) {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head>
            <title>${graphTitle}</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
              }
              #graph-container {
                width: 100%;
                height: 100%;
              }
            </style>
          </head>
          <body>
            <div id="graph-container">
              ${graphElement.innerHTML}
            </div>
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.focus();
    } else {
      console.error(`Graph element with id ${graphId} not found.`);
    }
  };

  const renderBallOptions = (graphId, graphTitle) => (
    <div className="ball-options">
      <button onClick={() => downloadGraph(graphId, graphTitle)}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button onClick={() => openGraphInNewTab(graphId, graphTitle)}>
        <FontAwesomeIcon icon={faExpandAlt} />
      </button>
    </div>
  );

  return (
    <div className="analytics-container">
      {sections.map((section) => (
        <div
          key={section.id}
          className="analytics-section"
          onMouseEnter={() => handleMouseEnter(section.id)}
          onMouseLeave={handleMouseLeave}
        >
          <h2>{section.title}</h2>
          <div id={section.id} className={`placeholder ${section.id}`}>
            <img
              src={section.imgSrc}
              alt={`${section.title} Visualization`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="ball">
              <FontAwesomeIcon icon={faEllipsisH} color="white" />
              {hoveredSection === section.id && renderBallOptions(section.id, section.title)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
