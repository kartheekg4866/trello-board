
describe('Web Test Scenarios', function() {
  let board1;
  let rootURL = 'http://localhost:3001';
  let webURL = 'http://localhost:4200';
  it('Navigate To url', () => {
    cy.visit(webURL);
  })
  it('Add new board click', () => {
    cy.get('.add-board').click();
    cy.request({url:rootURL+'/board',method:'GET',headers:{
      'Content-Type':  'application/json',
       'Accept': 'application/json'
    }}).then((resp) => {
        expect(resp.body.data).to.not.be.null;
        resp.body.data.forEach(function (item,index) {
          board1 = item;
        });
    });
  })
  it('Trello button click back to dashboard screen', () => {
      cy.get('.dashboardBtn').click();
    })
    it('Add Column in board',() => {
      cy.visit(webURL+'/b/'+ board1['_id']);
      cy.get('.add-column').click().then(()=>{
        cy.get('.add-column-input').type('New Column WebApp cypress').blur();
      })
    })
    it('Add card in board',() => {
      cy.visit(webURL+'/b/'+ board1['_id']);
       cy.get('.add-card-div').click({ force: true,mutiple:true }).then(()=>{
         cy.get('.add-card-input').type('New card WebApp cypress').blur();
       })
     })
});
