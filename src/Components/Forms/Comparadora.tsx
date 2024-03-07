export const Comparadora = () => {
  return (
    <form>
        <label htmlFor="nombre">Nombre: </label>
        <input type="text" name="nombre" id="nombre" placeholder="Galletas" minLength={4} maxLength={40} required />
        <label htmlFor="precio">Precio: </label>
        <input type="number" name="precio" id="precio" placeholder="1500" min={0} max={1000000} required />
        <label htmlFor="unidades">Unidades (mts/lts/cc/gr/kg): </label>
        <input type="number" name="unidades" id="unidades" placeholder="1500" min={0} max={1000000} required />
        <button className="btn">Agregar</button>
    </form>
  )
}
