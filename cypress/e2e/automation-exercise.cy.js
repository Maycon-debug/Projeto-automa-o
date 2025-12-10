describe('Automation Exercise', () => {
    const senha = '@12345678'
    const nome = 'Maycon'

    // Função para gerar email único
    const gerarEmail = () => {
        return `teste${Date.now()}${Math.random().toString(36).substring(7)}@teste.com`
    }

    beforeEach(() => {
        // Visitar o site antes de cada teste
        cy.visit('https://automationexercise.com/')
    })

    it('TC01: Cadastro do Usuario', () => {
        const email = gerarEmail()
        // clicar em Signup/Login
        cy.contains('Signup / Login').click()
        // preencher o formulario de cadastro
        cy.get('input[data-qa="signup-name"]').type(nome)
        // digite email único
        cy.get('input[data-qa="signup-email"]').type(email)
        // clicar em Signup button
        cy.get('button[data-qa="signup-button"]').click()
        // aguardar carregamento do formulário
        cy.get('form').should('be.visible')
        // preencher informações do formulário de cadastro
        cy.get('#id_gender1').check() // Title: Mr
        cy.get('#password').type(senha)
        cy.get('#days').select('15')
        cy.get('#months').select('5')
        cy.get('#years').select('1990')
        cy.get('#newsletter').check()
        cy.get('#optin').check()
        cy.get('#first_name').type('Maycon')
        cy.get('#last_name').type('Santos')
        cy.get('#company').type('Empresa Teste')
        cy.get('#address1').type('Rua Teste, 123')
        cy.get('#address2').type('Apto 45')
        cy.get('#country').select('United States')
        cy.get('#state').type('São Paulo')
        cy.get('#city').type('São Paulo')
        cy.get('#zipcode').type('01234567')
        cy.get('#mobile_number').type('11999999999')
        // clicar em Create Account button
        cy.get('button[data-qa="create-account"]').click()
        // verificar se a mensagem de sucesso foi exibida
        cy.contains('Account Created!').should('be.visible')
        // clicar em Continue
        cy.get('a[data-qa="continue-button"]').click()
        // verificar se está logado
        cy.contains('Logged in as').should('be.visible')
        cy.contains(nome).should('be.visible')
        // clicar em Logout
        cy.contains('Logout').click()
        // verificar se foi deslogado
        cy.url().should('include', '/login')
    })

    it('TC02: Login do Usuario', () => {
        const email = gerarEmail()
        // Primeiro criar uma conta para testar o login
        cy.contains('Signup / Login').click()
        cy.get('input[data-qa="signup-name"]').type(nome)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.get('button[data-qa="signup-button"]').click()
        cy.get('form').should('be.visible')
        cy.get('#id_gender1').check()
        cy.get('#password').type(senha)
        cy.get('#days').select('15')
        cy.get('#months').select('5')
        cy.get('#years').select('1990')
        cy.get('#first_name').type('Maycon')
        cy.get('#last_name').type('Santos')
        cy.get('#company').type('Empresa Teste')
        cy.get('#address1').type('Rua Teste, 123')
        cy.get('#state').type('São Paulo')
        cy.get('#city').type('São Paulo')
        cy.get('#zipcode').type('01234567')
        cy.get('#mobile_number').type('11999999999')
        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click()
        cy.contains('Logout').click()

        // Agora testar o login
        cy.contains('Signup / Login').click()
        // preencher email e senha
        cy.get('input[data-qa="login-email"]').type(email)
        cy.get('input[data-qa="login-password"]').type(senha)
        // clicar em Login
        cy.get('button[data-qa="login-button"]').click()
        // verificar se está logado
        cy.contains('Logged in as').should('be.visible')
        cy.contains(nome).should('be.visible')
    })

    it('TC03: Adicionar Produto ao Carrinho', () => {
        // Adicionar produto ao carrinho sem login
        cy.get('a[href="/products"]').click()
        // Aguardar carregamento dos produtos
        cy.get('.features_items').should('be.visible')
        // Clicar no primeiro produto (hover e depois clicar em View Product)
        cy.get('.product-image-wrapper').first().trigger('mouseover')
        cy.get('.product-image-wrapper').first().within(() => {
            cy.contains('View Product').click()
        })
        // Adicionar ao carrinho
        cy.contains('Add to cart').click()
        // Verificar modal de confirmação
        cy.get('#cartModal').should('be.visible')
        cy.contains('Your product has been added to cart').should('be.visible')
        // Clicar em View Cart
        cy.contains('View Cart').click()
        // Verificar se o produto está no carrinho
        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')
    })

    it('TC04: Verificar Carrinho', () => {
        // Adicionar produto ao carrinho
        cy.get('a[href="/products"]').click()
        cy.get('.features_items').should('be.visible')
        cy.get('.product-image-wrapper').first().trigger('mouseover')
        cy.get('.product-image-wrapper').first().within(() => {
            cy.contains('View Product').click()
        })
        cy.contains('Add to cart').click()
        cy.contains('View Cart').click()
        
        // Verificar elementos do carrinho
        cy.get('.cart_info').should('be.visible')
        cy.get('.cart_description').should('be.visible')
        cy.get('.cart_price').should('be.visible')
        cy.get('.cart_quantity').should('be.visible')
        cy.get('.cart_total').should('be.visible')
        // Verificar botão de checkout
        cy.contains('Proceed To Checkout').should('be.visible')
    })

    it('TC05: Finalizar Compra', () => {
        const email = gerarEmail()
        // Primeiro fazer login
        cy.contains('Signup / Login').click()
        cy.get('input[data-qa="signup-name"]').type(nome)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.get('button[data-qa="signup-button"]').click()
        cy.get('form').should('be.visible')
        cy.get('#id_gender1').check()
        cy.get('#password').type(senha)
        cy.get('#days').select('15')
        cy.get('#months').select('5')
        cy.get('#years').select('1990')
        cy.get('#first_name').type('Maycon')
        cy.get('#last_name').type('Santos')
        cy.get('#company').type('Empresa Teste')
        cy.get('#address1').type('Rua Teste, 123')
        cy.get('#state').type('São Paulo')
        cy.get('#city').type('São Paulo')
        cy.get('#zipcode').type('01234567')
        cy.get('#mobile_number').type('11999999999')
        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click()

        // Adicionar produto ao carrinho
        cy.get('a[href="/products"]').click()
        cy.get('.features_items').should('be.visible')
        cy.get('.product-image-wrapper').first().trigger('mouseover')
        cy.get('.product-image-wrapper').first().within(() => {
            cy.contains('View Product').click()
        })
        cy.contains('Add to cart').click()
        cy.contains('View Cart').click()
        
        // Proceder para checkout
        cy.contains('Proceed To Checkout').click()
        // Verificar se está na página de checkout
        cy.url().should('include', '/checkout')
        // Verificar resumo do pedido
        cy.get('.cart_info').should('be.visible')
        // Adicionar comentário (se o campo existir)
        cy.get('body').then(($body) => {
            if ($body.find('textarea[name="message"]').length > 0) {
                cy.get('textarea[name="message"]').type('Pedido de teste automatizado')
            }
        })
        // Finalizar pedido
        cy.contains('Place Order').click()
        // Preencher dados do cartão (dados de teste)
        cy.get('input[name="name_on_card"]').type('Maycon Santos')
        cy.get('input[name="card_number"]').type('1234567890123456')
        cy.get('input[name="cvc"]').type('123')
        cy.get('input[name="expiry_month"]').type('12')
        cy.get('input[name="expiry_year"]').type('2025')
        // Confirmar pagamento
        cy.get('#submit').click()
        // Verificar mensagem de sucesso
        cy.contains('Order Placed!').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed').should('be.visible')
    })
})