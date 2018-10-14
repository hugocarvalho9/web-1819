<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="manifesto">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Manifesto - TP4</title>
            </head>
            <body>
                <h1 align="center">Manifesto</h1>
                <hr />
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <table width="100%" border="0">
            <tbody>
                <tr>
                    <td width="50%">
                        <b>IDENTIFICADOR: </b>
                        <xsl:value-of select="identificador"/>
                    </td>
                    <td width="50%">
                        <b>DATA DE INÍCIO: </b>
                        <xsl:value-of select="dinicio"/>
                    </td>
                </tr>
                <tr>
                    <td width="50%">
                        <b>TITULO: </b>
                        <xsl:value-of select="titulo"/>
                    </td>
                    <td width="50%">
                        <b>DATA DE FIM: </b>
                        <xsl:value-of select="dfim"/>
                    </td>
                </tr>
                <tr>
                    <td width="50%">
                        <b>SUBTITULO: </b>
                        <xsl:value-of select="subtitulo"/>
                    </td>
                    <td width="50%">
                        <b>SUPERVISOR: </b>
                        <a href="{supervisor/website}">
                            <xsl:value-of select="supervisor/nome"/>
                        </a>
                        - 
                        <a href="mailto:{supervisor/email}">
                            <xsl:value-of select="supervisor/email"/>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
        <hr />
    </xsl:template>

    <xsl:template match="equipa">
        <h3>EQUIPA: </h3>
        <ol>
            <xsl:apply-templates/>
        </ol>
        <hr />
        <hr />
    </xsl:template>
    
    <xsl:template match="membro">
        <li>
            <xsl:value-of select="nome"/>
            - <a href="mailto:{email}">
                <xsl:value-of select="email"/>
            </a>
            - <a href="{website}" >
                <xsl:value-of select="website"/>
            </a>
        </li>
        <br />
        <br />
        <img src="{foto/@path}" width="300px" height="200px"></img>
    </xsl:template>
    
    <xsl:template match="resumo">
        <h3>RESUMO:</h3>
        <xsl:apply-templates/>
        <p>&#160;</p>
        <hr />
        <hr />
    </xsl:template>
    
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>
        </b>
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>
        </i>
    </xsl:template>
    
    <xsl:template match="resultados">
        <h3>RESULTADOS: </h3>
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    
    <xsl:template match="resultado">
        <li>
            <a href="{@url}">
                <xsl:value-of select="."/>
            </a>
        </li>
    </xsl:template>
    

</xsl:stylesheet>