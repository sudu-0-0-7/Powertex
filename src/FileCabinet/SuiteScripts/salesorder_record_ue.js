/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/currentRecord', 'N/search'],
    /**
 * @param{record} record
 */
    (record, curRec, search) => {
        const beforeLoad = (scriptContext) => {
            try {
                if (scriptContext.type === 'view') {
                    var currentRecId = scriptContext.newRecord.id
                    var invoiceSearch = search.create({
                        type: "transaction",
                        filters:
                            [
                                ["type", "anyof", "CustInvc"],
                                "AND",
                                ["createdfrom", "anyof", currentRecId],
                                "AND",
                                ["mainline", "is", "T"]
                            ],
                        columns:
                            [
                                search.createColumn({ name: "internalid", label: "Internal ID" })
                            ]
                    });
                    var invoiceSearchResultCount = invoiceSearch.runPaged().count;

                    var itemfulfillmentSearch = search.create({
                        type: "itemfulfillment",
                        filters:
                            [
                                ["createdfrom", "anyof", currentRecId],
                                "AND",
                                ["mainline", "is", "T"],
                                "AND",
                                ["type", "anyof", "ItemShip"]
                            ],
                        columns:
                            [
                                search.createColumn({ name: "internalid", label: "Internal ID" })
                            ]
                    });
                    var itemFulfillmentsearchResultCount = itemfulfillmentSearch.runPaged().count;

                    if (invoiceSearchResultCount == 0 && itemFulfillmentsearchResultCount == 0 || invoiceSearchResultCount >= 1 && itemFulfillmentsearchResultCount == 0 || invoiceSearchResultCount == 0 && itemFulfillmentsearchResultCount >= 1) {
                        scriptContext.form.addButton({
                            id: 'custpage_wipfli_button',
                            label: 'Create transactions',
                            functionName: 'createTransactions(' + currentRecId + ',' + invoiceSearchResultCount + ',' + itemFulfillmentsearchResultCount + ')'
                        });
                        scriptContext.form.clientScriptModulePath = './salesorder_record_cs.js';
                    }
                }
                
            }
            catch (e) {
                log.error("error in beforeload", e.message);
                return false;
            }
        }
        return { beforeLoad }
    });
