(self.webpackChunkclient=self.webpackChunkclient||[]).push([[410],{1410:(e,t,r)=>{"use strict";r.r(t),r.d(t,{CheckoutModule:()=>P});var i=r(5425),o=r(7368),n=r(9497),c=r(1116);function s(e,t){if(1&e&&(o.TgZ(0,"div"),o.TgZ(1,"div"),o._UZ(2,"i",2),o.qZA(),o.TgZ(3,"h2"),o._uU(4,"Your order has been confirmed. Thanks for shopping!"),o.qZA(),o.TgZ(5,"button",3),o._uU(6," View your order "),o.qZA(),o.qZA()),2&e){const e=o.oxw();o.xp6(5),o.MGl("routerLink","/orders/",e.order.id,"")}}function a(e,t){1&e&&(o.TgZ(0,"div"),o.TgZ(1,"h2"),o._uU(2,"Your order has undergone review. Thanks for shopping!"),o.qZA(),o.TgZ(3,"button",4),o._uU(4," View your orders "),o.qZA(),o.qZA())}let l=(()=>{class e{constructor(e){this.router=e;const t=this.router.getCurrentNavigation(),r=t&&t.extras&&t.extras.state;r&&(this.order=r)}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(n.F0))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-checkout-success"]],decls:3,vars:2,consts:[[1,"container","mt-5"],[4,"ngIf"],[1,"fa","fa-check-circle","fa-5x",2,"color","green"],[1,"btn","btn-outline-success",3,"routerLink"],["routerLink","/orders",1,"btn","btn-outline-primary"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.YNc(1,s,7,1,"div",1),o.YNc(2,a,5,0,"div",1),o.qZA()),2&e&&(o.xp6(1),o.Q6J("ngIf",t.order),o.xp6(1),o.Q6J("ngIf",!t.order))},directives:[c.O5,n.rH],styles:[""]}),e})();var d=r(1462),u=r(7568),p=r(9241),m=r(1084);function h(e,t){1&e&&o._UZ(0,"i",8)}function g(e,t){if(1&e){const e=o.EpF();o.TgZ(0,"li",5),o.TgZ(1,"button",6),o.NdJ("click",function(){const t=o.CHM(e).index;return o.oxw().onClick(t)}),o._uU(2),o.YNc(3,h,1,0,"i",7),o.qZA(),o.qZA()}if(2&e){const e=t.$implicit,r=t.index,i=o.oxw();o.xp6(1),o.ekj("active",i.selectedIndex===r),o.Q6J("disabled",!0),o.xp6(1),o.hij(" ",e.label,""),o.xp6(1),o.Q6J("ngIf",e.completed)}}let v=(()=>{class e extends m.B8{ngOnInit(){this.linear=this.linearModeSelected}onClick(e){this.selectedIndex=e}}return e.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(e)))(r||e)}}(),e.\u0275cmp=o.Xpm({type:e,selectors:[["app-stepper"]],inputs:{linearModeSelected:"linearModeSelected"},features:[o._Bn([{provide:m.B8,useExisting:e}]),o.qOj],decls:5,vars:2,consts:[[1,"container"],[1,"nav","nav-pills","nav-justified"],["class","nav-item",4,"ngFor","ngForOf"],[2,"margin-right","10px"],[3,"ngTemplateOutlet"],[1,"nav-item"],[1,"nav-link","py-3","text-uppercase","font-weight-bold","btn-block",2,"font-weight","bold",3,"disabled","click"],["class","fa fa-check",4,"ngIf"],[1,"fa","fa-check"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"ul",1),o.YNc(2,g,4,5,"li",2),o.qZA(),o.TgZ(3,"div",3),o.GkF(4,4),o.qZA(),o.qZA()),2&e&&(o.xp6(2),o.Q6J("ngForOf",t.steps),o.xp6(2),o.Q6J("ngTemplateOutlet",t.selected.content))},directives:[c.sg,c.tP,c.O5],styles:["button.nav-link[_ngcontent-%COMP%]{background:#e9ecef}button.nav-link[_ngcontent-%COMP%]:focus{outline:none}button.nav-link.active[_ngcontent-%COMP%]:hover{color:#fff}button.nav-link.active[_ngcontent-%COMP%]:focus, button.nav-link[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:active{outline:none}ul[_ngcontent-%COMP%]{list-style-type:none;padding-left:0}li[_ngcontent-%COMP%]{margin-right:10px}"]}),e})();var f=r(3492),b=r(4849);let Z=(()=>{class e{constructor(e,t){this.accountService=e,this.toastr=t}ngOnInit(){}saveUserAddress(){this.accountService.updateUserAddress(this.checkoutForm.get("addressForm").value).subscribe(e=>{var t;this.toastr.success("Address saved"),null===(t=this.checkoutForm.get("addressForm"))||void 0===t||t.reset(e)},e=>{this.toastr.error(e.message),console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(u.B),o.Y36(f._W))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-checkout-address"]],inputs:{checkoutForm:"checkoutForm"},decls:26,vars:9,consts:[[1,"mt-3",3,"formGroup"],[1,"d-flex","justify-content-between","align-items-center"],[1,"btn","btn-outline-success","mb-3",3,"disabled","click"],["formGroupName","addressForm",1,"row"],[1,"form-group","col-md-6"],["formControlName","firstName",3,"label"],["formControlName","lastName",3,"label"],["formControlName","street",3,"label"],["formControlName","city",3,"label"],["formControlName","state",3,"label"],["formControlName","zipCode",3,"label"],[1,"float-none","d-flex","justify-content-between","flex-column","flex-lg-row","mb-5"],["routerLink","/basket",1,"btn","btn-outline-primary"],[1,"fa","fa-angle-left"],["cdkStepperNext","",1,"btn","btn-primary",3,"disabled"],[1,"fa","fa-angle-right"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"h4"),o._uU(3,"Shipping Address"),o.qZA(),o.TgZ(4,"button",2),o.NdJ("click",function(){return t.saveUserAddress()}),o._uU(5," Save as default address "),o.qZA(),o.qZA(),o.TgZ(6,"div",3),o.TgZ(7,"div",4),o._UZ(8,"app-text-input",5),o.qZA(),o.TgZ(9,"div",4),o._UZ(10,"app-text-input",6),o.qZA(),o.TgZ(11,"div",4),o._UZ(12,"app-text-input",7),o.qZA(),o.TgZ(13,"div",4),o._UZ(14,"app-text-input",8),o.qZA(),o.TgZ(15,"div",4),o._UZ(16,"app-text-input",9),o.qZA(),o.TgZ(17,"div",4),o._UZ(18,"app-text-input",10),o.qZA(),o.qZA(),o.qZA(),o.TgZ(19,"div",11),o.TgZ(20,"button",12),o._UZ(21,"i",13),o._uU(22," Back to Basket "),o.qZA(),o.TgZ(23,"button",14),o._uU(24," Go to Delivery "),o._UZ(25,"i",15),o.qZA(),o.qZA()),2&e&&(o.Q6J("formGroup",t.checkoutForm),o.xp6(4),o.Q6J("disabled",!t.checkoutForm.get("addressForm").valid||!t.checkoutForm.get("addressForm").dirty),o.xp6(4),o.Q6J("label","First Name"),o.xp6(2),o.Q6J("label","Last Name"),o.xp6(2),o.Q6J("label","Street"),o.xp6(2),o.Q6J("label","City"),o.xp6(2),o.Q6J("label","State"),o.xp6(2),o.Q6J("label","Zip Code"),o.xp6(5),o.Q6J("disabled",t.checkoutForm.get("addressForm").invalid))},directives:[d.JL,d.sg,d.x0,b.t,d.JJ,d.u,n.rH,m.st],styles:[""]}),e})();var k=r(9996),y=r(529),x=r(2693);let A=(()=>{class e{constructor(e){this.http=e,this.baseUrl=y.N.apiUrl}createOrder(e){return this.http.post(this.baseUrl+"orders",e)}getDeliveryMethods(){return this.http.get(this.baseUrl+"orders/deliveryMethods").pipe((0,k.U)(e=>e.sort((e,t)=>t.price-e.price)))}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(x.eN))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function T(e,t){if(1&e){const e=o.EpF();o.TgZ(0,"div",9),o.TgZ(1,"input",10),o.NdJ("click",function(){const t=o.CHM(e).$implicit;return o.oxw().setShippingPrice(t)}),o.qZA(),o.TgZ(2,"label",11),o._UZ(3,"i",12),o.TgZ(4,"strong"),o._uU(5),o.ALo(6,"currency"),o.qZA(),o._UZ(7,"br"),o.TgZ(8,"span",13),o._uU(9),o.ALo(10,"lowercase"),o.qZA(),o.qZA(),o.qZA()}if(2&e){const e=t.$implicit;o.xp6(1),o.s9C("id",e.id),o.s9C("value",e.id),o.xp6(1),o.s9C("for",e.id),o.xp6(3),o.AsE("",e.shortName," - ",o.lcZ(6,6,e.price),""),o.xp6(4),o.hij("Arrives in ",o.lcZ(10,8,e.deliveryTime),"")}}let q=(()=>{class e{constructor(e,t){this.checkoutService=e,this.basketService=t}ngOnInit(){this.getDeliveryMethod()}getDeliveryMethod(){this.checkoutService.getDeliveryMethods().subscribe(e=>{this.deliveryMethods=e},e=>{console.log(e)})}setShippingPrice(e){this.basketService.setShippingPrice(e)}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(A),o.Y36(p.v))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-checkout-delivery"]],inputs:{checkoutForm:"checkoutForm"},decls:12,vars:3,consts:[[1,"mt-4",3,"formGroup"],[1,"mb-3"],["formGroupName","deliveryForm",1,"row"],["class","col-md-6 form-group mb-3",4,"ngFor","ngForOf"],[1,"float-none","d-flex","justify-content-between","flex-column","flex-lg-row","mb-5"],["cdkStepperPrevious","",1,"btn","btn-outline-primary"],[1,"fa","fa-angle-left"],["cdkStepperNext","",1,"btn","btn-primary",3,"disabled"],[1,"fa","fa-angle-right"],[1,"col-md-6","form-group","mb-3"],["type","radio","formControlName","deliveryMethod",1,"custom-control-input",3,"id","value","click"],[1,"custom-control-label",3,"for"],[1,"fa","fa-truck","mr-1"],[1,"label-description","px-1"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"h4",1),o._uU(2,"Choose your delivery method"),o.qZA(),o.TgZ(3,"div",2),o.YNc(4,T,11,10,"div",3),o.qZA(),o.qZA(),o.TgZ(5,"div",4),o.TgZ(6,"button",5),o._UZ(7,"i",6),o._uU(8," Back to Address "),o.qZA(),o.TgZ(9,"button",7),o._uU(10," Go to Review "),o._UZ(11,"i",8),o.qZA(),o.qZA()),2&e&&(o.Q6J("formGroup",t.checkoutForm),o.xp6(4),o.Q6J("ngForOf",t.deliveryMethods),o.xp6(5),o.Q6J("disabled",t.checkoutForm.get("deliveryForm").invalid))},directives:[d.JL,d.sg,d.x0,c.sg,m.po,m.st,d._,d.Fj,d.JJ,d.u],pipes:[c.H9,c.i8],styles:[""]}),e})();var _=r(1202);let C=(()=>{class e{constructor(e,t){this.basketService=e,this.toastr=t}ngOnInit(){this.basket$=this.basketService.basket$}createPaymentIntent(){this.basketService.createPaymentIntent().subscribe(e=>{this.stepNext.next()},e=>{console.log(e)})}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(p.v),o.Y36(f._W))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-checkout-review"]],inputs:{stepNext:"stepNext"},decls:12,vars:4,consts:[[1,"mt-4"],[1,"mb-3"],[3,"isBasket","items"],[1,"float-none","d-flex","justify-content-between","flex-column","flex-lg-row","mb-5"],["cdkStepperPrevious","",1,"btn","btn-outline-primary"],[1,"fa","fa-angle-left"],[1,"btn","btn-primary",3,"click"],[1,"fa","fa-angle-right"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"h4",1),o._uU(2,"Review your order"),o.qZA(),o._UZ(3,"app-basket-summary",2),o.ALo(4,"async"),o.qZA(),o.TgZ(5,"div",3),o.TgZ(6,"button",4),o._UZ(7,"i",5),o._uU(8," Back to Delivery "),o.qZA(),o.TgZ(9,"button",6),o.NdJ("click",function(){return t.createPaymentIntent()}),o._uU(10," Go to Payment "),o._UZ(11,"i",7),o.qZA(),o.qZA()),2&e&&(o.xp6(3),o.Q6J("isBasket",!1)("items",o.lcZ(4,2,t.basket$).items))},directives:[_.b,m.po],pipes:[c.Ov],styles:[""]}),e})();var F=r(6304);const N=["cardNumber"],U=["cardExpiry"],w=["cardCvc"];function J(e,t){if(1&e&&(o.ynx(0),o.TgZ(1,"span",19),o._uU(2),o.qZA(),o.BQk()),2&e){const e=o.oxw();o.xp6(2),o.Oqu(e.cardErrors)}}function E(e,t){1&e&&o._UZ(0,"i",20)}let S=(()=>{class e{constructor(e,t,r,i){this.checkoutService=e,this.toastr=t,this.router=r,this.basketService=i,this.cardHandler=this.onChange.bind(this),this.loading=!1,this.cardNumberValid=!1,this.cardExpiryValid=!1,this.cardCvcValid=!1,this.cardNumberEmpty=!0,this.cardExpiryEmpty=!0,this.cardCvcEmpty=!0}ngAfterViewInit(){this.stripe=Stripe("pk_test_51JSDN6LsvArkcsyVYjVIWu93DPnLLtp1hMKRGZohR3W8i6eEF88Ng6hewshCchb0ikRZboa6PkITi7yQZO3KWh8s00rXweoLwu");const e=this.stripe.elements();this.cardNumber=e.create("cardNumber"),this.cardNumber.mount(this.cardNumberElement.nativeElement),this.cardNumber.addEventListener("change",this.cardHandler),this.cardExpiry=e.create("cardExpiry"),this.cardExpiry.mount(this.cardExpiryElement.nativeElement),this.cardExpiry.addEventListener("change",this.cardHandler),this.cardCvc=e.create("cardCvc"),this.cardCvc.mount(this.cardCvcElement.nativeElement),this.cardCvc.addEventListener("change",this.cardHandler)}ngOnDestroy(){this.cardNumber.destroy(),this.cardExpiry.destroy(),this.cardCvc.destroy()}onChange(e){switch(console.log(e),this.cardErrors=e.error?e.error.message:null,e.elementType){case"cardNumber":this.cardNumberValid=e.complete,this.cardNumberEmpty=e.empty;break;case"cardExpiry":this.cardExpiryValid=e.complete,this.cardExpiryEmpty=e.empty;break;case"cardCvc":this.cardCvcValid=e.complete,this.cardCvcEmpty=e.empty}}submitOrder(){var e=this;return(0,F.Z)(function*(){e.loading=!0;const t=e.basketService.getCurrentBasketValue();try{const r=yield e.createOrder(t),i=yield e.confirmPaymentWithStripe(t);i.paymentIntent?(e.basketService.deleteBasket(t),e.router.navigate(["checkout/success"],{state:r})):e.toastr.error(i.error.message),e.loading=!1}catch(r){console.log(r),e.loading=!1}})()}confirmPaymentWithStripe(e){var t=this;return(0,F.Z)(function*(){var r;return t.stripe.confirmCardPayment(null==e?void 0:e.clientSecret,{payment_method:{card:t.cardNumber,billing_details:{name:null===(r=t.checkoutForm.get("paymentForm"))||void 0===r?void 0:r.get("nameOnCard").value}}})})()}createOrder(e){var t=this;return(0,F.Z)(function*(){const r=t.getOrderToCreate(e);return t.checkoutService.createOrder(r).toPromise()})()}getOrderToCreate(e){return{basketId:e.id,deliveryMethodId:+this.checkoutForm.get("deliveryForm").get("deliveryMethod").value,shipToAddress:this.checkoutForm.get("addressForm").value}}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(A),o.Y36(f._W),o.Y36(n.F0),o.Y36(p.v))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-checkout-payment"]],viewQuery:function(e,t){if(1&e&&(o.Gf(N,7),o.Gf(U,7),o.Gf(w,7)),2&e){let e;o.iGM(e=o.CRH())&&(t.cardNumberElement=e.first),o.iGM(e=o.CRH())&&(t.cardExpiryElement=e.first),o.iGM(e=o.CRH())&&(t.cardCvcElement=e.first)}},inputs:{checkoutForm:"checkoutForm"},decls:28,vars:11,consts:[[1,"mt-4",3,"formGroup"],[1,"mb-3"],[1,"row"],["formGroupName","paymentForm",1,"form-group","col-md-12"],["formControlName","nameOnCard",3,"label"],[1,"form-group","mb-3","col-md-6","mb-3"],[1,"form-control"],["cardNumber",""],[4,"ngIf"],[1,"form-group","mb-3","col-md-3","mb-3"],["cardExpiry",""],["cardCvc",""],["href","https://stripe.com/docs/testing#cards","target","_blank"],[1,"float-none","d-flex","justify-content-between","flex-column","flex-lg-row","mb-5"],["cdkStepperPrevious","",1,"btn","btn-outline-primary"],[1,"fa","fa-angle-left"],[1,"btn","btn-primary",3,"disabled","click"],[1,"fa","fa-angle-right"],["class","fa fa-spinner fa-spin",4,"ngIf"],[1,"text-danger",2,"font-size","0.875em"],[1,"fa","fa-spinner","fa-spin"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"h4",1),o._uU(2,"Pay with Stripe"),o.qZA(),o.TgZ(3,"div",2),o.TgZ(4,"div",3),o._UZ(5,"app-text-input",4),o.qZA(),o.TgZ(6,"div",5),o._UZ(7,"div",6,7),o.YNc(9,J,3,1,"ng-container",8),o.qZA(),o.TgZ(10,"div",9),o._UZ(11,"div",6,10),o.qZA(),o.TgZ(13,"div",9),o._UZ(14,"div",6,11),o.qZA(),o.qZA(),o.qZA(),o.TgZ(16,"div",1),o._uU(17," Please use testcard 4242 4242 4242 4242 with a future expiry date. "),o.TgZ(18,"a",12),o._uU(19," See More. "),o.qZA(),o.qZA(),o.TgZ(20,"div",13),o.TgZ(21,"button",14),o._UZ(22,"i",15),o._uU(23," Back to Review "),o.qZA(),o.TgZ(24,"button",16),o.NdJ("click",function(){return t.submitOrder()}),o._uU(25," Submit Order "),o._UZ(26,"i",17),o.YNc(27,E,1,0,"i",18),o.qZA(),o.qZA()),2&e&&(o.Q6J("formGroup",t.checkoutForm),o.xp6(5),o.Q6J("label","Name on card"),o.xp6(2),o.Tol(t.cardNumberEmpty||null==t.cardErrors&&!t.cardNumberValid?null:t.cardNumberValid?"is-valid":"is-invalid"),o.xp6(2),o.Q6J("ngIf",t.cardErrors),o.xp6(2),o.Tol(t.cardExpiryEmpty||null==t.cardErrors&&!t.cardExpiryValid?null:t.cardExpiryValid?"is-valid":"is-invalid"),o.xp6(3),o.Tol(t.cardCvcEmpty||null==t.cardErrors&&!t.cardCvcValid?null:t.cardCvcValid?"is-valid":"is-invalid"),o.xp6(10),o.Q6J("disabled",t.loading||t.checkoutForm.get("paymentForm").invalid||!t.cardNumberValid||!t.cardExpiryValid||!t.cardCvcValid),o.xp6(3),o.Q6J("ngIf",t.loading))},directives:[d.JL,d.sg,d.x0,b.t,d.JJ,d.u,c.O5,m.po],styles:[""]}),e})();var O=r(4040);function M(e,t){if(1&e&&(o._UZ(0,"app-order-summary",12),o.ALo(1,"async"),o.ALo(2,"async"),o.ALo(3,"async")),2&e){const e=o.oxw();o.Q6J("shipping",o.lcZ(1,3,e.basketTotal$).shipping)("subtotal",o.lcZ(2,5,e.basketTotal$).subtotal)("total",o.lcZ(3,7,e.basketTotal$).total)}}const I=[{path:"",component:(()=>{class e{constructor(e,t,r){this.accountService=e,this.fb=t,this.basketService=r}ngOnInit(){this.createCheckoutForm(),this.getAddressFormValues(),this.getDeliveryMethodValue(),this.basketTotal$=this.basketService.basketTotal$}createCheckoutForm(){this.checkoutForm=this.fb.group({addressForm:this.fb.group({firstName:[null,d.kI.required],lastName:[null,d.kI.required],street:[null,d.kI.required],city:[null,d.kI.required],state:[null,d.kI.required],zipCode:[null,d.kI.required]}),deliveryForm:this.fb.group({deliveryMethod:[null,d.kI.required]}),paymentForm:this.fb.group({nameOnCard:[null,d.kI.required]})})}getAddressFormValues(){this.accountService.getUserAddress().subscribe(e=>{var t;e&&(null===(t=this.checkoutForm.get("addressForm"))||void 0===t||t.patchValue(e))},e=>{console.log(e)})}getDeliveryMethodValue(){var e,t,r;const i=this.basketService.getCurrentBasketValue();null!==(null==i?void 0:i.deliveryMethodId)&&(null===(t=null===(e=this.checkoutForm.get("deliveryForm"))||void 0===e?void 0:e.get("deliveryMethod"))||void 0===t||t.patchValue(null===(r=null==i?void 0:i.deliveryMethodId)||void 0===r?void 0:r.toString()))}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(u.B),o.Y36(d.qu),o.Y36(p.v))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-checkout"]],decls:17,vars:14,consts:[[1,"container","mt-3"],[1,"pb-5"],[1,"row"],[1,"col-md-9","py-5","mb-1"],[3,"linearModeSelected"],["appStepper",""],[3,"label","completed"],[3,"checkoutForm"],[3,"label"],[3,"stepNext"],[1,"col-md-3","py-5","mb-1"],[3,"shipping","subtotal","total",4,"ngIf"],[3,"shipping","subtotal","total"]],template:function(e,t){if(1&e&&(o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"div",2),o.TgZ(3,"section",3),o.TgZ(4,"app-stepper",4,5),o.TgZ(6,"cdk-step",6),o._UZ(7,"app-checkout-address",7),o.qZA(),o.TgZ(8,"cdk-step",6),o._UZ(9,"app-checkout-delivery",7),o.qZA(),o.TgZ(10,"cdk-step",8),o._UZ(11,"app-checkout-review",9),o.qZA(),o.TgZ(12,"cdk-step",8),o._UZ(13,"app-checkout-payment",7),o.qZA(),o.qZA(),o.qZA(),o.TgZ(14,"section",10),o.YNc(15,M,4,9,"app-order-summary",11),o.ALo(16,"async"),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&e){const e=o.MAs(5);o.xp6(4),o.Q6J("linearModeSelected",!0),o.xp6(2),o.Q6J("label","Address")("completed",t.checkoutForm.get("addressForm").valid),o.xp6(1),o.Q6J("checkoutForm",t.checkoutForm),o.xp6(1),o.Q6J("label","Delivery")("completed",t.checkoutForm.get("deliveryForm").valid),o.xp6(1),o.Q6J("checkoutForm",t.checkoutForm),o.xp6(1),o.Q6J("label","Review"),o.xp6(1),o.Q6J("stepNext",e),o.xp6(1),o.Q6J("label","Payment"),o.xp6(1),o.Q6J("checkoutForm",t.checkoutForm),o.xp6(2),o.Q6J("ngIf",o.lcZ(16,12,t.basketTotal$))}},directives:[v,m.be,Z,q,C,S,c.O5,O.h],pipes:[c.Ov],styles:["a[_ngcontent-%COMP%]{text-decoration:none;color:#000}span[_ngcontent-%COMP%]{font-weight:400;font-style:italic}strong[_ngcontent-%COMP%]{font-weight:600}"]}),e})()},{path:"success",component:l,data:{breadcrumb:"Success"}}];let Q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[c.ez,n.Bz.forChild(I)],n.Bz]}),e})(),P=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[c.ez,Q,i.m]]}),e})()}}]);