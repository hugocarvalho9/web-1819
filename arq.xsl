<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes" />
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>Arqueossítios</title>
                </head>
                <body>
                    <h2>Arqueossítios do NW Português</h2>
                    <hr />
                    <ol>
                        <!-- Não repetir CONCEL (falta tratar os espaços) -->
                        <xsl:apply-templates select="//CONCEL[not(.=preceding::CONCEL)]">
                            <xsl:sort select="."/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="arqelems" />
    </xsl:template>
    
    
    <!-- Template para o index.html -->
    <xsl:template match="CONCEL">
        <xsl:variable name="c" select="."/>
        <li>
            <xsl:value-of select="."/>
            <ol>
                <!-- Só os ARQELEM dos concelhos onde estamos posicionados -->
                <xsl:for-each select="//ARQELEM[$c=CONCEL]">
                    <xsl:sort select="IDENTI" />
                    <li>
                        <a href="http://localhost:4000/arqelem?id={generate-id()}">
                            <xsl:value-of select="IDENTI"/>
                        </a>
                    </li>
                </xsl:for-each>
            </ol>
        </li>
    </xsl:template>
    
    <!-- Template para as páginas individuais -->
    <xsl:template match="ARQELEM" mode="arqelems">
        <xsl:result-document href="website/html/{generate-id()}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <h1>
                        <xsl:value-of select="IDENTI"/>
                    </h1>
                    <h2>
                        <xsl:value-of select="DESCRI"/>
                    </h2>
                    <dl>
                        <dt>Lugar: </dt>
                        <dd><xsl:value-of select="LUGAR"/></dd>
                        <dt>Freguesia: </dt>
                        <dd><xsl:value-of select="FREGUE"/></dd>
                        <dt>Conselho: </dt>
                        <dd><xsl:value-of select="CONCEL"/></dd>
                    </dl>
                    <p>
                        <xsl:value-of select="ACESSO"/>
                    </p>
                    
                    <p>
                        <xsl:value-of select="QUADRO"/>
                    </p>
                    
                    <p>
                        <xsl:value-of select="DESARQ"/>
                    </p>
                    <address>
                        [<a href="http://localhost:4000/index">Voltar à pagina principal</a>]
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>