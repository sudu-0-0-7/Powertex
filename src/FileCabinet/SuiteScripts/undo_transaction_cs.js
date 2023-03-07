/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/search'],
  /**
   * @param{currentRecord} currentRecord
   * @param{record} record
   * @param{search} search
   */
  function (currentRecord, record, search) {

    function pageInit(scriptContext) {

    }

    function deletetransaction(salesOrderId) {
      try{

      var itemfulfillmentSearch = search.create({
        type: "itemfulfillment",
        filters:
          [
            ["createdfrom", "anyof", salesOrderId],
            "AND",
            ["type", "anyof", "ItemShip"],
            "AND",
            ["mainline", "is", "T"]
          ],
        columns:
          [
            search.createColumn({ name: "internalid", label: "Internal ID" })
          ]
      });
      var itemFulfillments = itemfulfillmentSearch.run().getRange(0, 10);

      if (itemFulfillments.length > 0) {
        for (var i = 0; i < itemFulfillments.length; i++) {
          var itemId = itemFulfillments[i].getValue('internalid');
          record.delete({
            type: "itemfulfillment",
            id: itemId,
          });
        }
      }

      var invoiceSearch = search.create({
        type: "invoice",
        filters:
          [
            ["createdfrom", "anyof", salesOrderId],
            "AND",
            ["type", "anyof", "CustInvc"],
            "AND",
            ["mainline", "is", "T"]
          ],
        columns:
          [
            search.createColumn({ name: "internalid", label: "Internal ID" })
          ]
      });
      var invoices = invoiceSearch.run().getRange(0, 10);

      if (invoices.length > 0) {
        for (var j = 0; j < invoices.length; j++) {
          var invoiceId = invoices[j].getValue('internalid');
          record.delete({
            type: "invoice",
            id: invoiceId,
          });
        }
      }
    }
    catch(e){
      log.error({
        title: "error in delete function",
        details: e.message
      })
    }
    }





    return {
      pageInit: pageInit,
      deletetransaction: deletetransaction

    };

  });
