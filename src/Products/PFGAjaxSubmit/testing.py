from plone.app.testing import PloneSandboxLayer
from plone.app.testing import applyProfile
from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import IntegrationTesting
from plone.app.testing import FunctionalTesting

from plone.testing import z2

from zope.configuration import xmlconfig


class ProductspfgajaxsubmitLayer(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load ZCML
        import Products.PFGAjaxSubmit
        xmlconfig.file(
            'configure.zcml',
            Products.PFGAjaxSubmit,
            context=configurationContext
        )

        # Install products that use an old-style initialize() function
        #z2.installProduct(app, 'Products.PloneFormGen')

#    def tearDownZope(self, app):
#        # Uninstall products installed above
#        z2.uninstallProduct(app, 'Products.PloneFormGen')

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'Products.PFGAjaxSubmit:default')

PRODUCTS_PFGAJAXSUBMIT_FIXTURE = ProductspfgajaxsubmitLayer()
PRODUCTS_PFGAJAXSUBMIT_INTEGRATION_TESTING = IntegrationTesting(
    bases=(PRODUCTS_PFGAJAXSUBMIT_FIXTURE,),
    name="ProductspfgajaxsubmitLayer:Integration"
)
PRODUCTS_PFGAJAXSUBMIT_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(PRODUCTS_PFGAJAXSUBMIT_FIXTURE, z2.ZSERVER_FIXTURE),
    name="ProductspfgajaxsubmitLayer:Functional"
)
