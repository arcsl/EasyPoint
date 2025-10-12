# 📘 Sintaxis narrativa para generación automática de memorias

Este documento define las **6 normas de sintaxis** empleadas en las plantillas narrativas de los bloques del sistema.

---

## 1️⃣ `{{ ... }}{Ref}` → Condicional
Muestra el texto solo si el elemento `Ref` (o `MainBloc`) tiene `Checked = true`.

**Ejemplo:**
```text
{{La bomba de circulación está activa.}}{CaldBomb}
```
➡️ Solo se mostrará si el elemento `CaldBomb` está marcado como activo (`Checked = true`).

---

## 2️⃣ `[ ... / ... ]{Ref}` → Selección por cantidad
Permite elegir automáticamente una de las dos opciones según la cantidad (`Cantidad`):
- Si `Cantidad = 1` → primera opción.
- Si `Cantidad > 1` → segunda opción.

**Ejemplo:**
```text
[la bomba / las bombas]{CaldBomb}
```
➡️ Se convertirá en “la bomba” o “las bombas” según corresponda.

---

## 3️⃣ `[ ... | ... | ... ]` → Selección del usuario
Genera un **menú desplegable (`<select>`)** para que el usuario elija entre varias opciones.

**Ejemplo:**
```text
El control será [manual | horario | demanda].
```
➡️ El usuario seleccionará manualmente una de las opciones.

---

## 4️⃣ `[{Propiedad}]{Ref}` → Propiedad del elemento
Inserta directamente el valor de una propiedad (`Propiedad`) del elemento referenciado (`Ref`).

**Ejemplo:**
```text
La sonda [{NombreUsuario}]{CaldTemp} mide la temperatura del agua.
```
➡️ Si `CaldTemp.NombreUsuario = "Temp. Ida"`, el resultado será “La sonda Temp. Ida mide la temperatura del agua.”

---

## 5️⃣ `[[ ... ]]` → Texto editable
Muestra un campo editable (`<input>` o `<textarea>`) para que el usuario escriba o modifique un valor.

**Ejemplo:**
```text
La consigna de temperatura será [[introducir valor]] °C.
```
➡️ Se genera un campo de texto editable.

---

## 6️⃣ `{...}` → Limpieza de referencias sueltas
Elimina etiquetas o referencias `{Ref}` que no estén dentro de ninguna estructura reconocida, para evitar residuos en el texto final.

**Ejemplo:**
```text
Sensor de presión {CaldPres}
```
➡️ Se convertirá en “Sensor de presión”.

---

📄 **Resumen visual de las reglas:**

| Nº | Sintaxis | Función |
|----|-----------|----------|
| 1 | `{{ ... }}{Ref}` | Texto condicional según elemento activo |
| 2 | `[ ... / ... ]{Ref}` | Selección automática por cantidad |
| 3 | `[ ... | ... | ... ]` | Selección manual por el usuario |
| 4 | `[{Propiedad}]{Ref}` | Inserta el valor de una propiedad |
| 5 | `[[ ... ]]` | Campo de texto editable |
| 6 | `{...}` | Limpieza de referencias sueltas |

---
