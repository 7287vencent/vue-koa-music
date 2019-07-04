/**
 * 音乐模型
 */
class Music {
  /**
   * 构造音乐对象
   * @param  {number} id       标识
   * @param  {string} name     歌曲名
   * @param  {string} artist   艺术家
   * @param  {number} duration 时长
   * @param  {string} music    歌曲文件名
   * @param  {string} poster   海报文件名
   * @param  {string} lyric    歌词文件名
   * @return {Music}           音乐对象
   */
  constructor(id, name, artist, duration, music, poster, lyric) {
    this.id = id
    this.name = name
    this.artist = artist
    this.duration = duration
    this.music = music
    this.poster = poster
    this.lyric = lyric
  }

  static find() {
    return storage
  }

  static findOne(id) {
    return storage.find(s => s.id === id)
  }

  delete() {
    return storage.splice(storage.indexOf(this), 1)
  }

  save() {
    storage.indexOf(this) === -1 && storage.push(this)
    return true
  }

  update() {
    return true
  }
}
// 标识 歌曲名 艺术家 时长 歌曲文件名 海报文件名 歌词文件名
const storage = [
  new Music(1,"俗世呀","Aki阿杰",235,"Aki阿杰 - 俗世呀.mp3","俗世呀.jpg","俗世呀.lrc"),
  new Music(2,"京物语","smile_小千",294,"smile_小千 - 京物语.mp3","京物语.jpg","京物语.lrc"),
  new Music(3,"乌衣巷","smile_小千",294,"smile_小千 - 乌衣巷.mp3","乌衣巷.jpg","乌衣巷.lrc")
]

module.exports = Music
