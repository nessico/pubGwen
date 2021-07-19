(self.webpackChunkclient=self.webpackChunkclient||[]).push([[822],{5822:(t,e,n)=>{"use strict";n.r(e),n.d(e,{BasketModule:()=>m});var i=n(5425),c=n(1116),r=n(7368),o=n(9241);function s(t,e){if(1&t&&(r.TgZ(0,"ul",4),r.TgZ(1,"li",5),r.TgZ(2,"span"),r._uU(3,"Order subtotal"),r.qZA(),r.TgZ(4,"strong"),r._uU(5),r.ALo(6,"currency"),r.qZA(),r.qZA(),r.TgZ(7,"li",5),r.TgZ(8,"span",6),r._uU(9,"Shipping and handling"),r.qZA(),r.TgZ(10,"strong"),r._uU(11),r.ALo(12,"currency"),r.qZA(),r.qZA(),r.TgZ(13,"li",5),r.TgZ(14,"span"),r._uU(15,"Total"),r.qZA(),r.TgZ(16,"strong"),r._uU(17),r.ALo(18,"currency"),r.qZA(),r.qZA(),r.qZA()),2&t){const t=e.ngIf;r.xp6(5),r.Oqu(r.lcZ(6,3,t.subtotal)),r.xp6(6),r.Oqu(r.lcZ(12,5,t.shipping)),r.xp6(6),r.Oqu(r.lcZ(18,7,t.total))}}let Z=(()=>{class t{constructor(t){this.basketService=t}ngOnInit(){this.basketTotal$=this.basketService.basketTotal$}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(o.v))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-order-summary"]],decls:7,vars:3,consts:[[1,"bg-light","px-4","py-3","text-uppercase","font-weight-bold","orderTotal"],[1,"p-4"],[1,"font-italic","mb-4"],["class","list-unstyled mb-4",4,"ngIf"],[1,"list-unstyled","mb-4"],[1,"d-flex","justify-content-between","py-3","border-bottom"],["c",""]],template:function(t,e){1&t&&(r.TgZ(0,"div",0),r._uU(1," Order Summary\n"),r.qZA(),r.TgZ(2,"div",1),r.TgZ(3,"p",2),r._uU(4,"Shipping costs are calculated at checkout"),r.qZA(),r.YNc(5,s,19,9,"ul",3),r.ALo(6,"async"),r.qZA()),2&t&&(r.xp6(5),r.Q6J("ngIf",r.lcZ(6,1,e.basketTotal$)))},directives:[c.O5],pipes:[c.Ov,c.H9],styles:[".orderTotal[_ngcontent-%COMP%]{font-weight:700}"]}),t})();var a=n(9021);function g(t,e){1&t&&(r.TgZ(0,"div"),r.TgZ(1,"p"),r._uU(2,"There are no items in your basket"),r.qZA(),r.qZA())}function l(t,e){if(1&t){const t=r.EpF();r.TgZ(0,"tr"),r.TgZ(1,"th",15),r.TgZ(2,"div",16),r._UZ(3,"img",17),r.TgZ(4,"div",18),r.TgZ(5,"h5",19),r.TgZ(6,"a",20),r._uU(7),r.qZA(),r.qZA(),r.TgZ(8,"span",21),r.TgZ(9,"strong"),r._uU(10,"Brand: "),r.qZA(),r._uU(11),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(12,"td",22),r.TgZ(13,"strong"),r._uU(14),r.ALo(15,"currency"),r.qZA(),r.qZA(),r.TgZ(16,"td",22),r.TgZ(17,"div",23),r.TgZ(18,"i",24),r.NdJ("click",function(){const e=r.CHM(t).$implicit;return r.oxw(2).decrementItemQuantity(e)}),r.qZA(),r.TgZ(19,"span",25),r._uU(20),r.qZA(),r.TgZ(21,"i",26),r.NdJ("click",function(){const e=r.CHM(t).$implicit;return r.oxw(2).incrementItemQuantity(e)}),r.qZA(),r.qZA(),r.qZA(),r.TgZ(22,"td",22),r.TgZ(23,"strong"),r._uU(24),r.ALo(25,"currency"),r.qZA(),r.qZA(),r.TgZ(26,"td",27),r.TgZ(27,"i",28),r.NdJ("click",function(){const e=r.CHM(t).$implicit;return r.oxw(2).removeBasketItem(e)}),r.qZA(),r.qZA(),r.qZA()}if(2&t){const t=e.$implicit;r.xp6(3),r.s9C("src",t.pictureUrl,r.LSH),r.s9C("alt",t.productName),r.xp6(3),r.MGl("routerLink","/shop/",t.id,""),r.xp6(1),r.Oqu(t.productName),r.xp6(4),r.Oqu(t.brand),r.xp6(3),r.Oqu(r.lcZ(15,8,t.price)),r.xp6(6),r.Oqu(t.quantity),r.xp6(4),r.hij("",r.lcZ(25,10,t.price*t.quantity)," ")}}function u(t,e){if(1&t&&(r.TgZ(0,"div"),r.TgZ(1,"div",2),r.TgZ(2,"div",3),r.TgZ(3,"div",4),r.TgZ(4,"section",5),r.TgZ(5,"div",6),r.TgZ(6,"table",7),r.TgZ(7,"thead"),r.TgZ(8,"tr"),r.TgZ(9,"th",8),r.TgZ(10,"div",9),r._uU(11,"Item"),r.qZA(),r.qZA(),r.TgZ(12,"th",8),r.TgZ(13,"div",10),r._uU(14,"Price"),r.qZA(),r.qZA(),r.TgZ(15,"th",8),r.TgZ(16,"div",10),r._uU(17,"Quantity"),r.qZA(),r.qZA(),r.TgZ(18,"th",8),r.TgZ(19,"div",10),r._uU(20,"Total"),r.qZA(),r.qZA(),r.TgZ(21,"th",11),r.TgZ(22,"div",10),r._uU(23,"Remove"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(24,"tbody"),r.YNc(25,l,28,12,"tr",12),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(26,"section",13),r._UZ(27,"app-order-summary"),r.TgZ(28,"a",14),r._uU(29," Proceed to checkout "),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&t){const t=e.ngIf;r.xp6(25),r.Q6J("ngForOf",t.items)}}const p=[{path:"",component:(()=>{class t{constructor(t){this.basketService=t}ngOnInit(){this.basket$=this.basketService.basket$}removeBasketItem(t){this.basketService.removeItemFromBasket(t)}incrementItemQuantity(t){this.basketService.incrementItemQuantity(t)}decrementItemQuantity(t){this.basketService.decrementItemQuantity(t)}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(o.v))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-basket"]],decls:5,vars:6,consts:[[1,"container","mt-3"],[4,"ngIf"],[1,"pb-5"],[1,"container"],[1,"row"],[1,"col-9","py-5","mb-1","bg-white","rounded","shadow-sm"],[1,"table-responsive"],[1,"table"],["scope","col",1,"border-0","bg-light"],[1,"p-2","px-3","text-uppercase"],[1,"py-2","text-uppercase"],["scope","col",1,"border-0","bg-light","text-center"],[4,"ngFor","ngForOf"],[1,"col-3","py-5","mb-1"],["routerLink","/checkout",1,"btn","btn-primary","py-2","mx-4",2,"color","white"],["scope","row"],[1,"p-2"],[1,"img-fluid",2,"max-height","100px",3,"src","alt"],[1,"ml-3","d-inline-block","align-middle"],[1,"mb-0"],[3,"routerLink"],[1,"d-block"],[1,"align-middle"],[1,"d-flex","align-items-center"],[1,"fa","fa-minus-circle","fa-lg","mx-2",2,"cursor","pointer",3,"click"],[1,"font-weight-bold",2,"font-size","1.5em"],[1,"fa","fa-plus-circle","fa-lg","mx-2",2,"cursor","pointer",3,"click"],[1,"align-middle","text-center"],[1,"fa","fa-trash","fa-2x",2,"color","black","cursor","pointer",3,"click"]],template:function(t,e){1&t&&(r.TgZ(0,"div",0),r.YNc(1,g,3,0,"div",1),r.ALo(2,"async"),r.YNc(3,u,30,1,"div",1),r.ALo(4,"async"),r.qZA()),2&t&&(r.xp6(1),r.Q6J("ngIf",null===r.lcZ(2,2,e.basket$)),r.xp6(2),r.Q6J("ngIf",r.lcZ(4,4,e.basket$)))},directives:[c.O5,c.sg,Z,a.yS],pipes:[c.Ov,c.H9],styles:["a[_ngcontent-%COMP%]{text-decoration:none;color:#000}span[_ngcontent-%COMP%]{font-weight:400;font-style:italic}strong[_ngcontent-%COMP%]{font-weight:600}"]}),t})()}];let d=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[c.ez,a.Bz.forChild(p)],a.Bz]}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[c.ez,d,i.m]]}),t})()}}]);