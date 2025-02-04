import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import logo from "../Images/logo.png"; // Adjust the logo path as per your setup
import './Download.css';

const Download = () => {
  const [selectedGraphs, setSelectedGraphs] = useState([]);
  const [includeGif, setIncludeGif] = useState(false);

  const graphOptions = [
    'Heatmap',
    'Bar Graph',
    'Line Graph',
    'ROC Curve',
    'Precision-Recall Curve',
    'Confusion Matrix',
    'Time Series Plot',
    'Scatter Plot',
    'Histogram',
    'Box Plot',
  ];

  const handleCheckboxChange = (graph) => {
    setSelectedGraphs((prevSelected) => {
      if (prevSelected.includes(graph)) {
        return prevSelected.filter((item) => item !== graph);
      } else {
        return [...prevSelected, graph];
      }
    });
  };

  const handleAllGraphsChange = () => {
    if (selectedGraphs.length === graphOptions.length) {
      setSelectedGraphs([]); // Deselect all if all are currently selected
      setIncludeGif(false); // Deselect GIF if all graphs are deselected
    } else {
      setSelectedGraphs([...graphOptions]); // Select all if not all are selected
      setIncludeGif(true); // Automatically select the GIF when all graphs are selected
    }
  };

  const handleDownloadReport = async () => {
    if (selectedGraphs.length === 0 && !includeGif) {
      alert('Please select at least one graph or include the GIF to download.');
      return;
    }

    const doc = new jsPDF();

    const img = new Image();
    img.src = logo;

    img.onload = () => {
      // Set background color for the first page
      doc.setFillColor(1, 6, 56); // RGB value for #010638
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F'); // Fill the page with the background color

      // Add logo centered at the top
      const logoWidth = 70; // Logo width
      const logoHeight = 70; // Logo height
      const logoX = (doc.internal.pageSize.width - logoWidth) / 2; // Centered position
      doc.addImage(img, "PNG", logoX, 20, logoWidth, logoHeight); // Adjusted logo size and position

      // Title "REPORT" in a thinner font (non-bold) and color #2196f3
      doc.setFont('helvetica', 'normal'); // Use normal (non-bold) font
      doc.setFontSize(36); // Larger size for the word "REPORT"
      doc.setTextColor(33, 150, 243); // Set color to #2196f3 (light blue)
      doc.text("REPORT", doc.internal.pageSize.width / 2, 100, { align: "center" });

      // Add vertical colored lines
      const startX = 10; // Position the line on the far left
      const startY = 0; // Start from the top of the page
      const pageHeight = doc.internal.pageSize.height; // Get the height of the page
      let colors = [
        { color: [33, 150, 243], height: pageHeight / 5 }, // Light Blue (#2196f3)
        { color: [76, 175, 80], height: pageHeight / 5 },  // Green (#4caf50)
        { color: [244, 67, 54], height: pageHeight / 5 },  // Red (#f44336)
        { color: [255, 152, 0], height: pageHeight / 5 },  // Orange (#ff9800)
        { color: [156, 39, 176], height: pageHeight / 5 }, // Purple (#9c27b0)
      ];

      let currentY = startY;
      colors.forEach((line) => {
        doc.setFillColor(line.color[0], line.color[1], line.color[2]); // Set the color
        doc.rect(startX, currentY, 5, line.height, 'F'); // Draw the colored rectangle (line)
        currentY += line.height; // Move down for the next color
      });

      // Add the "Generated using" text at the bottom
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(150); // Grey color
      doc.text("Generated using Eye Spy - Anomaly Detection System", doc.internal.pageSize.width / 2, pageHeight - 10, { align: "center" });

      // Add graph pages
      selectedGraphs.forEach((graph, index) => {
        doc.addPage();

        // Graph title in blue color, aligned to the left
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        const titleX = 20; // Aligned to the left
        const titleY = 30; // Slightly higher to keep it near the top of the page
        doc.setTextColor(33, 150, 243); // Set color to blue (#2196f3)
        doc.text(graph, titleX, titleY);

        // Elegant, thinner colored border at the bottom of the graph title
        const borderY = titleY + 8; // Position the border slightly below the title
        const borderHeight = 2; // Reduced height for a subtle border
        const borderWidth = 160; // Slightly narrower border
        let colorStartX = titleX; // Start position for left alignment
        let colorStartY = borderY;

        // Colors for the border
        let borderColors = [
          [33, 150, 243], // Light Blue (#2196f3)
          [76, 175, 80],  // Green (#4caf50)
          [244, 67, 54],  // Red (#f44336)
          [255, 152, 0],  // Orange (#ff9800)
          [156, 39, 176], // Purple (#9c27b0)
        ];

        let colorWidth = borderWidth / 5; // Divide the border width into five segments
        borderColors.forEach((color, idx) => {
          doc.setFillColor(color[0], color[1], color[2]);
          doc.rect(colorStartX + idx * colorWidth, colorStartY, colorWidth, borderHeight, 'F'); // Draw the colored segment
        });

        // Placeholder for graph area
        const graphX = 20;
        const graphY = titleY + 20; // Adjusted to keep space from title
        const graphWidth = 170;
        const graphHeight = 120;
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(240, 240, 240); // Light grey for placeholder
        doc.rect(graphX, graphY, graphWidth, graphHeight, 'F'); // Properly aligned box for graph

        // Insights and explanation
        const insightsY = graphY + graphHeight + 20; // Increased space below the graph
        const insightsX = 20; // Space from the left edge
        const insightsWidth = doc.internal.pageSize.width - 40; // Width to have space on both sides

        // Insights Section - Heading with border at the bottom
        doc.setFontSize(16); // Larger font for "Insights" heading
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(33, 150, 243); // Same color as graph title (#2196f3)
        doc.text("Insights", insightsX, insightsY);

        // Bottom border for Insights heading (aligned to the left like the graph title)
        const insightsBorderY = insightsY + 5; // Position after heading
        const insightsBorderHeight = 2; // Thin border height
        const insightsBorderWidth = 160; // Slightly narrower border width
        let insightsColorStartX = insightsX;
        let insightsColorStartY = insightsBorderY;

        let insightsBorderColors = [
          [33, 150, 243], // Light Blue (#2196f3)
          [76, 175, 80],  // Green (#4caf50)
          [244, 67, 54],  // Red (#f44336)
          [255, 152, 0],  // Orange (#ff9800)
          [156, 39, 176], // Purple (#9c27b0)
        ];

        let insightsColorWidth = insightsBorderWidth / 5;
        insightsBorderColors.forEach((color, idx) => {
          doc.setFillColor(color[0], color[1], color[2]);
          doc.rect(insightsColorStartX + idx * insightsColorWidth, insightsColorStartY, insightsColorWidth, insightsBorderHeight, 'F'); // Draw the colored segment
        });

        // Text below the Insights section
        const insightsTextY = insightsBorderY + 10; // Text positioned below the border
        const insightsText = "Insights: The trend of anomaly detection shows how the detected anomalies change over time. This can reflect key changes in surveillance data and help detect critical events in the video stream.";
        
        doc.setFontSize(12); // Slightly smaller text for the insights explanation
        doc.setTextColor(100); // Grey color for the text
        doc.text(insightsText, insightsX, insightsTextY, { maxWidth: insightsWidth });

        // Page numbers
        doc.setFontSize(10);
        doc.text(`Page ${index + 2}`, 200, 290, { align: "right" });
      });

      // Add GIF page if selected
      if (includeGif) {
        doc.addPage();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(33, 150, 243); // Set color to blue (#2196f3)
        doc.text("GIF Visualization", 20, 30); // Left-aligned title

        // Add colored border below GIF title
        const gifBorderY = 38; // Position the border below the GIF title
        const gifBorderHeight = 2; // Thin border height
        const gifBorderWidth = 160; // Narrower border width
        const gifColorStartX = 20; // Left alignment for the GIF border
        const gifBorderColors = [
          [33, 150, 243], // Light Blue (#2196f3)
          [76, 175, 80],  // Green (#4caf50)
          [244, 67, 54],  // Red (#f44336)
          [255, 152, 0],  // Orange (#ff9800)
          [156, 39, 176], // Purple (#9c27b0)
        ];

        let gifColorWidth = gifBorderWidth / 5;
        gifBorderColors.forEach((color, idx) => {
          doc.setFillColor(color[0], color[1], color[2]);
          doc.rect(gifColorStartX + idx * gifColorWidth, gifBorderY, gifColorWidth, gifBorderHeight, 'F'); // Draw the colored segment
        });

        // Placeholder for GIF
        const gifX = 20;
        const gifY = 50;
        const gifWidth = 170;
        const gifHeight = 120;
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(240, 240, 240); // Light grey for placeholder
        doc.rect(gifX, gifY, gifWidth, gifHeight, 'F');
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("GIF Placeholder", doc.internal.pageSize.width / 2, gifY + gifHeight / 2, { align: "center" });

        doc.setFontSize(10);
        doc.text("Page " + (selectedGraphs.length + 2), 200, 290, { align: "right" });
      }

      // Save the PDF
      doc.save('Graph_Report.pdf');
    };
  };

  return (
    <div className="download-container">
      <div className="download-card">
        <h2>Select Graphs to Download</h2>
        <ul className="graph-list">
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedGraphs.length === graphOptions.length}
                onChange={handleAllGraphsChange}
              />
              All Graphs
            </label>
          </li>
          {graphOptions.map((graph) => (
            <li key={graph}>
              <label>
                <input
                  type="checkbox"
                  value={graph}
                  checked={selectedGraphs.includes(graph)}
                  onChange={() => handleCheckboxChange(graph)}
                />
                {graph}
              </label>
            </li>
          ))}
          <li>
            <label>
              <input
                type="checkbox"
                checked={includeGif}
                onChange={(e) => setIncludeGif(e.target.checked)}
              />
              Include GIF
            </label>
          </li>
        </ul>
        <button className="download-button" onClick={handleDownloadReport}>
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Download;
