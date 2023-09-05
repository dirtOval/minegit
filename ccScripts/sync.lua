
  --declare table mem
  --gather all data on computer, save to mem
  --assemble data into string
  --send post request to server

function goToRoot()
  local currentDir = shell.dir()
  while string.len(currentDir) > 0 do
    shell.run("cd", "..")
    currentDir = shell.dir()
  end
end

--might make more sense to go straight to JSON
--rather than make it into a table first.
function assembleString(path)
  local JSON = "{"
  local items = fs.list(path)
  for k,v in pairs(items) do
    print(v)
    if fs.isDir(shell.resolve(v)) then
       JSON = JSON .. '"' .. v .. '":{' ..
       assembleString(shell.resolve(v)) ..
       '},'
    else
       --print(v .. " is not a directory!")
      local file = fs.open(shell.resolve(v), "r")
      if file then
        local contents = file.readAll()
        JSON = JSON .. '"' .. v .. '":'
        JSON = JSON .. '"' .. contents .. '",'
        file.close()
      end
    end 
  end
  return JSON
end

function sync()
 --goToRoot()
  
end

local post = assembleString(shell.dir())
http.post('http://localhost:42069/jsontest', post)
