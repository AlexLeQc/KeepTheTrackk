import * as XLSX from 'xlsx';

export function exportInventoryToExcel(items) {
  if (!items || items.length === 0) {
    alert("Aucun article à exporter");
    return;
  }

  try {
    const excelData = items.map((item, index) => ({
      'N°': index + 1,
      'Nom de l\'article': item.nom,
      'Quantité': item.quantite,
      'Date d\'ajout': item.createdAt ? formatDate(item.createdAt) : 'N/A',
      'État': getStockStatus(item.quantite)
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventaire');

    const colWidths = [
      { wch: 5 },
      { wch: 30 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 }
    ];
    worksheet['!cols'] = colWidths;

    const fileName = `inventaire_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    console.log(`Export Excel réussi: ${fileName}`);
  } catch (error) {
    console.error('Erreur lors de l\'export Excel:', error);
    alert('Erreur lors de l\'export. Veuillez réessayer.');
  }
}

function formatDate(date) {
  if (!date) return 'N/A';

  try {
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('fr-FR');
  } catch (error) {
    console.warn('Erreur de formatage de date:', error);
    return 'N/A';
  }
}

function getStockStatus(quantity) {
  if (quantity === 0) return 'Rupture de stock';
  if (quantity <= 5) return 'Stock faible';
  return 'En stock';
}
