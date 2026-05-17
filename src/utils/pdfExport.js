import jsPDF from 'jspdf';

export const downloadReviewAsPDF =
  async review => {
    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      'DevLens AI Review',
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Language: ${review.language}`,
      20,
      40
    );

    doc.text(
      `Score: ${review.score || 'N/A'}`,
      20,
      50
    );

    doc.text(
      'AI Review:',
      20,
      70
    );

    const lines =
      doc.splitTextToSize(
        review.aiResponse || '',
        170
      );

    doc.text(lines, 20, 80);

    doc.save('review.pdf');
  };