# 📘 Sintaxis de Plantillas Semánticas – Guía v1.0

Este documento define la mini gramática utilizada para generar **memorias técnicas dinámicas** 
a partir de plantillas textuales con marcadores semánticos.  
Su propósito es describir un lenguaje ligero y legible para expresar 
variaciones de texto (plurales, condicionales, opciones, edición manual, etc.) 
sin usar código complejo.

---

## 1. Introducción

Las plantillas semánticas permiten que un texto descriptivo (por ejemplo, 
una memoria técnica de un sistema HVAC) se genere automáticamente a partir 
de un JSON que describe el proyecto y sus elementos.

Cada marcador en el texto utiliza **corchetes `[]` y llaves `{}`** 
para indicar reglas de sustitución o condicionales.

Ejemplo:

```
La caldera[s]{Caldera} dispone de bomba[s]{Bomba} y sonda[s]{Temperatura} 
de [impulsión / impulsión y retorno]{Temperatura}.
```

Según los datos del proyecto, el sistema elige plurales, versiones u opciones
y genera el texto final de la memoria técnica.

---

## 2. Estructura básica de los marcadores

Los **corchetes `[...]`** delimitan un fragmento que puede variar o 
mostrarse condicionalmente.  
Las **llaves `{...}`** (opcionales) indican a qué elemento o variable del 
proyecto se asocia el marcador.

Ejemplo general:

```
[texto alternativo / texto plural]{Etiqueta}
```

---

## 3. Tipos de marcadores y su comportamiento

| Tipo de marcador | Ejemplo | Resultado según datos |
|------------------|----------|------------------------|
| **Plural etiquetado** | `[s]{Bomba}` | Añade “s” si `Bomba.Cantidad > 1` |
| **Plural global** | `[s]` | Añade “s” si `cantidadGlobal > 1` |
| **Condicional automático** | `[la bomba / las bombas]{Bomba}` | Usa “la bomba” o “las bombas” según la cantidad |
| **Condicional global** | `[equipo / equipos]` | Igual que el anterior, pero basado en cantidad global |
| **Condicional simple** | `[funcionamiento alterno]{Bomba}` | Muestra “funcionamiento alterno” si `Bomba.Cantidad > 1` |
| **Selector manual** | `[manual | horario | demanda]{ModoControl}` | Genera un `<select>` con esas tres opciones |
| **Campo editable** | `[[valor de consigna]]` | Genera un `<span contenteditable>` editable por el usuario |
| **Omisión de secciones** | `[texto opcional]{Bomba}` con `Checked=false` | Elimina el texto completo |

---

## 4. Evaluación automática de los marcadores

Durante el procesamiento de la narrativa:

1. Si el marcador contiene `{Etiqueta}`, el sistema busca en el JSON del bloque
   un elemento cuyo `Nombre` coincida (normalizando acentos y mayúsculas).
2. Si ese elemento tiene `Cantidad > 1`, se aplican las partes “plurales” o 
   la segunda alternativa en los marcadores `[A / B]`.
3. Si el elemento tiene `Checked: false`, cualquier marcador asociado se elimina.
4. Si el marcador no tiene `{Etiqueta}`, se evalúa con `cantidadGlobal` (por defecto 1).
5. Los selectores manuales `[A | B | C]` siempre generan un `<select>` 
   visible para que el usuario elija manualmente.
6. Los campos `[[texto]]` se convierten en texto editable directamente en el DOM.

---

## 5. Sintaxis formal (definición simplificada)

```
Plantilla ::= Texto | Plantilla Marcador Plantilla

Marcador ::=
    "[" Texto "/" Texto "]" "{" Etiqueta "}"      ; Condicional etiquetado
  | "[" Texto "/" Texto "]"                       ; Condicional global
  | "[" Texto "]" "{" Etiqueta "}"                ; Condicional simple etiquetado
  | "[" Texto "]"                                 ; Condicional simple global
  | "[" Texto "|" Texto ("|" Texto)* "]"          ; Selector manual
  | "[[" Texto "]]"                               ; Campo editable
  | "[" ("s" | "es") "]" "{" Etiqueta "}"         ; Plural etiquetado
  | "[" ("s" | "es") "]"                          ; Plural global
  | "[" Texto "]" "{" Etiqueta "}" con Checked=false → eliminar
```

---

## 6. Ejemplo completo de aplicación

**Plantilla:**

```
El conjunto de caldera[s]{Caldera} dispone de bomba[s]{Bomba} y 
sonda[s]{Temperatura} de [impulsión / impulsión y retorno]{Temperatura}.
```

**Datos del proyecto:**

```json
{
  "Caldera": { "Cantidad": 2, "Checked": true },
  "Bomba": { "Cantidad": 1, "Checked": false },
  "Temperatura": { "Cantidad": 2, "Checked": true }
}
```

**Resultado generado:**

```text
El conjunto de calderas dispone de  y sondas de impulsión y retorno.
```

*(La parte de la bomba se elimina porque `Checked: false`)*

---

## 7. Extensiones futuras

- Soporte de **variables lógicas** adicionales en el JSON, 
  por ejemplo `"ModoControl": "demanda"`, para preseleccionar opciones.
- Inclusión de **bloques condicionales anidados** 
  (por ejemplo `[texto con [subtexto]{SubElemento}]{Elemento}`). 
- Generación inversa: convertir un texto editado en valores de JSON.
