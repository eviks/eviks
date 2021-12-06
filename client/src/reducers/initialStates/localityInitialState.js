const initialState = {
  localities: [],
  currentLocality: {
    nextQuestionDate: Date.now(),
    city: {
      name: 'Bakı',
      id: '10',
      routeName: 'baku',
      location: [49.8786270618439, 40.379108951404],
      children: [
        { id: '114', name: 'Xətai' },
        { id: '111', name: 'Nəsimi' },
        { id: '112', name: 'Nərimanov' },
        { id: '115', name: 'Səbail' },
        { id: '120', name: 'Xəzər' },
        { id: '117', name: 'Binəqədi' },
        { id: '116', name: 'Yasamal' },
        { id: '121', name: 'Qaradağ' },
        { id: '113', name: 'Nizami' },
        { id: '119', name: 'Suraxanı' },
        { id: '122', name: 'Pirallahı' },
        { id: '118', name: 'Sabunçu' },
      ],
    },
  },
};

export default initialState;
